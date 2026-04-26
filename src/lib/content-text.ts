const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

export function cleanContentText(text: string): string {
  return text.replace(MARKDOWN_LINK_REGEX, "$1").replace(/\s+/g, " ").trim();
}
