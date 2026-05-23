import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("docs/agent-handoff/video-source-index.md", [
  "Video Source Index",
  "Access boundary",
  "The original MP4 uploads are conversation attachments",
  "Video 01 - Cendorq mobile and Semrush mobile",
  "Video 02 - Yext Scout mobile",
  "Video 03 - Cendorq desktop and Semrush desktop",
  "Video 04 - Semrush AI Visibility style recording",
  "AI Search Presence Repair",
]);

expect("docs/agent-handoff/video-04-semrush-ai-visibility-notes.md", [
  "Video 04 Semrush AI Visibility Notes",
  "simple AI visibility score",
  "AI surface or engine mentions",
  "prompt-tracking style rows",
  "State, Gap, Queue, Control",
  "AI Search Presence Repair",
]);

if (failures.length) {
  console.error("Video source handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Video source handoff validation passed.");

function expect(path, phrases) {
  const absolutePath = join(root, path);
  if (!existsSync(absolutePath)) {
    failures.push(`Missing required video source file: ${path}`);
    return;
  }

  const text = readFileSync(absolutePath, "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
