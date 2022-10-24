export const checkValidity = (number: number, min: number, max: number) => {
  if (number && (number < min || number > max)) return false;

  return true;
};
