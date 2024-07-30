export const countLines = (text: string): number => {
  return text.split('</p><p>').length;
};
