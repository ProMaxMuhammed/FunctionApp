export const calculateZoomedDomain = (currentDomain, scale) => {
  const [min, max] = currentDomain;
  const center = (max + min) / 2;
  const newHalfRange = ((max - min) / 2) * scale;
  return [center - newHalfRange, center + newHalfRange];
};

export const calculatePannedDomain = (
  currentDomain,
  translation,
  axisLength
) => {
  const [min, max] = currentDomain;
  const scale = (max - min) / axisLength;
  const translationValue = -translation * scale;
  return [min + translationValue, max + translationValue];
};
