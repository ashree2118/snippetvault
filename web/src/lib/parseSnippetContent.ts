/**
 * Parses snippet content (markdown with optional fenced code blocks) into
 * alternating segments: text → code → text → code ...
 * Used to render description, then code block, then description, etc.
 */
export type ContentSegment =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language: string };

export function parseSnippetContent(
  raw: string,
  fallbackLanguage: string = 'text'
): ContentSegment[] {
  if (!raw || !raw.trim()) return [];

  const segments: ContentSegment[] = [];
  // Match ```optionalLang\n...content...```
  const fenceRe = /```(\w*)\s*\n([\s\S]*?)```/g;
  let lastEnd = 0;
  let match: RegExpExecArray | null;

  while ((match = fenceRe.exec(raw)) !== null) {
    // Text before this code block
    if (match.index > lastEnd) {
      const textContent = raw.slice(lastEnd, match.index).trim();
      if (textContent) {
        segments.push({ type: 'text', content: textContent });
      }
    }
    const language = (match[1] || fallbackLanguage).trim().toLowerCase() || fallbackLanguage;
    const codeContent = match[2].trim();
    segments.push({ type: 'code', content: codeContent, language });
    lastEnd = fenceRe.lastIndex;
  }

  // Remaining text after last code block
  if (lastEnd < raw.length) {
    const textContent = raw.slice(lastEnd).trim();
    if (textContent) {
      segments.push({ type: 'text', content: textContent });
    }
  }

  // No code fences found: treat entire content as one code block (backward compatible)
  if (segments.length === 0 && raw.trim()) {
    segments.push({
      type: 'code',
      content: raw.trim(),
      language: fallbackLanguage,
    });
  }

  return segments;
}
