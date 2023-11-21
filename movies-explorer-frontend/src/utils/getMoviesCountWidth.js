//рассчеты от ширины ограничивающего div-контейнера
export const getLoadStep = (width) => {
  if (width >= 1140) return 4;
  if (width >= 850) return 3;

  return 2;
}

export const getInitialCount = (width) => {
  if (width === 0) return 0;
  if (width >= 1140) return 12;
  if (width >= 850) return 9;
  if (width >= 570) return 8;

  return 5;
}