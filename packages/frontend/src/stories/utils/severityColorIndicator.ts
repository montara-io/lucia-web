export interface ValidationFunProps {
  value: number;
  maxValue?: number;
  minValue?: number;
}

export const isValid = (data: ValidationFunProps): boolean => {
  const { value, maxValue = 100, minValue = 0 } = data || {};
  return (!!value || value === 0) && value >= minValue && value <= maxValue;
};

export const isInValid = (data: ValidationFunProps): boolean => {
  return !isValid(data);
};
