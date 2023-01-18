import { highSeverity, midSeverity, noSeverity } from '../../styles/colors'
import { LOW_VALUE, HIGH_VALUE } from './consts'
import { SEVERITY_COLOR } from './enums'

export interface ValidationFunProps {
  value: number
  maxValue?: number
  minValue?: number
}

export const isValid = (data: ValidationFunProps): boolean => {
  const { value, maxValue = 100, minValue = 0 } = data || {}
  return (!!value || value === 0) && value >= minValue && value <= maxValue
}

export const isInValid = (data: ValidationFunProps): boolean => {
  return !isValid(data)
}

export const getSeverityByValue = (value: number = 50) => {
  if (!isValid({ value })) {
    return SEVERITY_COLOR.NONE
  }
  if (value >= HIGH_VALUE) {
    return SEVERITY_COLOR.NO_SEVERITY
  }
  if (value >= LOW_VALUE) {
    return SEVERITY_COLOR.MID_SEVERITY
  }
  return SEVERITY_COLOR.HIGH_SEVERITY
}

export const getColorBySeverity = (severity: SEVERITY_COLOR) => {
  switch (severity) {
    case SEVERITY_COLOR.NO_SEVERITY:
      return noSeverity
    case SEVERITY_COLOR.MID_SEVERITY:
      return midSeverity
    case SEVERITY_COLOR.HIGH_SEVERITY:
      return highSeverity
    default:
      return highSeverity
  }
}
