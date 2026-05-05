const DEFAULT_SAFE_PROHIBITION_MARKERS = [
  "must never",
  "must not",
  "must not claim",
  "do not",
  "does not",
  "not to",
  "not an",
  "not a",
  "never log",
  "never claim",
  "never imply",
  "avoid",
  "without",
  "cannot",
  "blocked",
  "disallowed",
  "closed to",
  "no partial",
  "safe failure",
  "only append",
  "only safe",
  "generic safe",
  "non-mutating",
  "read-only",
  "prevent",
  "prevents",
  "protected from",
  "no smoke check may",
  "no protected route may",
  "no public conversion route may",
  "no owner configuration",
  "no agent",
  "no agent-created",
  "must not act",
  "must not create",
  "must not weaken",
  "unsupported guarantee",
  "unsupported legal",
  "false",
  "allowed: false",
];

export function containsUnsafeClaim(text, phrase, options = {}) {
  const normalizedText = text.toLowerCase();
  const normalizedPhrase = phrase.toLowerCase();
  const before = options.before ?? 240;
  const after = options.after ?? 240;
  const markers = [...DEFAULT_SAFE_PROHIBITION_MARKERS, ...(options.safeMarkers ?? [])].map((marker) => marker.toLowerCase());

  let index = normalizedText.indexOf(normalizedPhrase);
  while (index !== -1) {
    const paragraphStart = Math.max(0, normalizedText.lastIndexOf("\n\n", index));
    const nextParagraphBreak = normalizedText.indexOf("\n\n", index);
    const paragraphEnd = nextParagraphBreak === -1 ? normalizedText.length : nextParagraphBreak;
    const paragraph = normalizedText.slice(paragraphStart, paragraphEnd);
    const window = normalizedText.slice(Math.max(0, index - before), Math.min(normalizedText.length, index + normalizedPhrase.length + after));
    const context = `${paragraph}\n${window}`;
    const safeProhibition = markers.some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = normalizedText.indexOf(normalizedPhrase, index + normalizedPhrase.length);
  }

  return false;
}
