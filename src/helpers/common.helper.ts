export const calculateReadingTime = (text: string): number => {
  const _wordsPerMinute = 240;
  const _textLength: number = text.split(" ").length;

  if (_textLength < 0) return 0;
  return Math.ceil(_textLength / _wordsPerMinute);
};

export const clearString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(/ /g, "-")
    .replaceAll(/[:._ ]/g, "")
    .toLowerCase();
};
