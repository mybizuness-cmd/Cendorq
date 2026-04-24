#!/usr/bin/env node

"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = process.cwd();
const DEFAULT_TARGETS = [path.join(ROOT_DIR, "src")];

const TEXT_FILE_EXTENSIONS = new Set([
    ".css",
    ".cts",
    ".cjs",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".md",
    ".mdx",
    ".mjs",
    ".mts",
    ".scss",
    ".sql",
    ".svg",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml",
]);

const EXCLUDED_DIRECTORIES = new Set([
    ".git",
    ".idea",
    ".next",
    ".turbo",
    ".vercel",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "out",
]);

const EXCLUDED_FILENAMES = new Set([
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
]);

async function main() {
    const cli = parseArgs(process.argv.slice(2));

    if (cli.help) {
        printHelp();
        process.exit(0);
    }

    const targets = resolveTargets(cli.targets);
    const files = await collectFiles(targets);

    if (files.length === 0) {
        console.log("[normalize-whitespace] No eligible files found.");
        return;
    }

    let changedCount = 0;
    const changedFiles = [];

    for (const filePath of files) {
        const result = await normalizeFile(filePath, {
            write: !cli.checkOnly,
            verbose: cli.verbose,
        });

        if (result.changed) {
            changedCount += 1;
            changedFiles.push(filePath);
        }
    }

    if (cli.checkOnly) {
        if (changedFiles.length > 0) {
            console.error(
                `[normalize-whitespace] ${changedFiles.length} file(s) need whitespace normalization.`,
            );

            if (cli.verbose) {
                for (const filePath of changedFiles) {
                    console.error(` - ${toRelative(filePath)}`);
                }
            }

            process.exit(1);
        }

        console.log("[normalize-whitespace] All eligible files are already normalized.");
        return;
    }

    console.log(
        `[normalize-whitespace] Normalized ${changedCount} of ${files.length} eligible file(s).`,
    );
}

function parseArgs(args) {
    const parsed = {
        checkOnly: false,
        help: false,
        verbose: false,
        targets: [],
    };

    for (const arg of args) {
        if (arg === "--check") {
            parsed.checkOnly = true;
            continue;
        }

        if (arg === "--help" || arg === "-h") {
            parsed.help = true;
            continue;
        }

        if (arg === "--verbose" || arg === "-v") {
            parsed.verbose = true;
            continue;
        }

        parsed.targets.push(arg);
    }

    return parsed;
}

function printHelp() {
    console.log(`
normalize-whitespace

Usage:
  node ./src/scripts/normalize-whitespace.js [options] [targets...]

Options:
  --check Check whether files need normalization without writing changes
  --verbose Print each changed file
  --help, -h Show this help message

Default target:
  ./src

What it normalizes:
  - Converts CRLF to LF
  - Removes trailing whitespace
  - Trims extra blank lines at end of file
  - Collapses 3+ consecutive blank lines into 2
  - Ensures a single trailing newline for non-empty files
`.trim());
}

function resolveTargets(targets) {
    if (!targets || targets.length === 0) {
        return DEFAULT_TARGETS;
    }

    return targets.map((target) =>
        path.isAbsolute(target) ? target : path.join(ROOT_DIR, target),
    );
}

async function collectFiles(targets) {
    const files = [];

    for (const target of targets) {
        const stat = await safeStat(target);
        if (!stat) continue;

        if (stat.isFile()) {
            if (shouldProcessFile(target)) {
                files.push(target);
            }
            continue;
        }

        if (stat.isDirectory()) {
            const nested = await walkDirectory(target);
            files.push(...nested);
        }
    }

    return files.sort((left, right) => left.localeCompare(right));
}

async function walkDirectory(directoryPath) {
    const files = [];
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directoryPath, entry.name);

        if (entry.isDirectory()) {
            if (shouldSkipDirectory(entry.name)) {
                continue;
            }

            files.push(...(await walkDirectory(fullPath)));
            continue;
        }

        if (!entry.isFile()) {
            continue;
        }

        if (shouldProcessFile(fullPath)) {
            files.push(fullPath);
        }
    }

    return files;
}

function shouldSkipDirectory(directoryName) {
    return EXCLUDED_DIRECTORIES.has(directoryName);
}

function shouldProcessFile(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    const filename = path.basename(filePath);

    if (EXCLUDED_FILENAMES.has(filename)) {
        return false;
    }

    return TEXT_FILE_EXTENSIONS.has(extension);
}

async function normalizeFile(filePath, options) {
    const originalBuffer = await fs.readFile(filePath);
    const originalContent = originalBuffer.toString("utf8");
    const normalizedContent = normalizeWhitespace(originalContent);

    const changed = normalizedContent !== originalContent;

    if (!changed) {
        return { changed: false };
    }

    if (options.write) {
        await fs.writeFile(filePath, normalizedContent, "utf8");
    }

    if (options.verbose) {
        console.log(
            `${options.write ? "[updated]" : "[needs update]"} ${toRelative(filePath)}`,
        );
    }

    return { changed: true };
}

function normalizeWhitespace(content) {
    let next = content;

    next = next.replace(/\r\n/g, "\n");
    next = next.replace(/[ \t]+$/gm, "");
    next = next.replace(/\n{3,}/g, "\n\n");
    next = next.replace(/\n+$/g, "");

    if (next.length === 0) {
        return "";
    }

    return `${next}\n`;
}

async function safeStat(targetPath) {
    try {
        return await fs.stat(targetPath);
    } catch {
        return null;
    }
}

function toRelative(filePath) {
    return path.relative(ROOT_DIR, filePath) || ".";
}

main().catch((error) => {
    console.error("[normalize-whitespace] Failed.");
    console.error(error instanceof Error ? error.stack || error.message : String(error));
    process.exit(1);
});
