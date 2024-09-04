export function truncateText(text: string, maxLength: number, ellipsis = '...'): string {
  // If the text is already shorter than or equal to the max length, return it as is
  if (text.length <= maxLength) {
    return text;
  }

  // Calculate the length of text to keep
  const keepLength = maxLength - ellipsis.length;

  // Ensure keepLength is not negative
  if (keepLength < 0) {
    return ellipsis.slice(0, maxLength);
  }

  // Truncate the text and add ellipsis
  return text.slice(0, keepLength) + ellipsis;
}