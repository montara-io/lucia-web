import { SEVERITY_KEYS } from './enums';
import {
  EXTRA_PADDING,
  HIGH_VALUE,
  LOW_VALUE,
  MAX_VALUE,
  MAX_ZOOM_VALUE,
  MIN_ZOOM_VALUE,
} from './consts';

/** return severity key by score, and return the translated value **/
export const getSeverityKey = (score: number) => {
  let severityKey = SEVERITY_KEYS.LOW;
  if (score >= 0 && score <= 100) {
    if (score >= HIGH_VALUE) {
      severityKey = SEVERITY_KEYS.HIGH;
    } else if (score >= LOW_VALUE) {
      severityKey = SEVERITY_KEYS.MID;
    }
  }
  return severityKey;
};

export const getSeverityByScore = (score: number, intl: any) => {
  const severityKey = getSeverityKey(score);

  return intl.formatMessage({
    id: severityKey,
    defaultMessage: severityKey.toUpperCase(),
  });
};

/** return object that represent the min max for zoom in trajectory chart **/
export const getMinMaxViewForTrajectory = (data?: any, dynamicZoom = false, padding = 10) => {
  if (dynamicZoom && data) {
    const scoresAndBenchmarks = data?.reduce((acc, { score, benchmark }) => {
      acc.push(score);
      acc.push(benchmark);
      return acc;
    }, []);

    const minScoreValue = Math.min(...scoresAndBenchmarks);
    const maxScoreValue = Math.max(...scoresAndBenchmarks);

    const minZoomValue = Math.max(minScoreValue - padding, MIN_ZOOM_VALUE);
    const maxZoomValue = Math.min(maxScoreValue + padding, MAX_ZOOM_VALUE);

    return {
      min: minZoomValue,
      max: maxZoomValue,
    };
  }
  return {
    min: MIN_ZOOM_VALUE,
    max: MAX_ZOOM_VALUE,
  };
};

/** return object that represent the min max for zoom in the charts **/
export const getMinMaxView = (data?: any, dynamicZoom = false, padding = 10) => {
  if (dynamicZoom && data) {
    const scores = data?.map(({ score }) => score);

    const minScoreValue = Math.min(...scores);
    const maxScoreValue = Math.max(...scores);

    const minZoomValue = Math.max(minScoreValue - padding, MIN_ZOOM_VALUE);
    const maxZoomValue = Math.min(maxScoreValue + padding, MAX_ZOOM_VALUE);

    const howManyLabels = calcNumOfLabels(minZoomValue, maxZoomValue);

    if (howManyLabels <= 1) {
      return adjustZoom(howManyLabels, minZoomValue, maxZoomValue);
    }

    return {
      min: minZoomValue === LOW_VALUE ? LOW_VALUE - EXTRA_PADDING : minZoomValue,
      max: maxZoomValue === HIGH_VALUE ? HIGH_VALUE + EXTRA_PADDING : maxZoomValue,
    };
  }
  return {
    min: MIN_ZOOM_VALUE,
    max: MAX_ZOOM_VALUE,
  };
};

/** Get min & max and return number of labels [0,50,75,100] that overlap with the values **/
const calcNumOfLabels = (min: number, max: number) => {
  return [MIN_ZOOM_VALUE, LOW_VALUE, HIGH_VALUE, MAX_ZOOM_VALUE].reduce((acc, curr) => {
    if (curr >= min && curr <= max) {
      acc++;
    }
    return acc;
  }, 0);
};

/** Get min & max in case of one label and adjust zoom to show two labels
 *  The calculation is for in which position to add the label
 *  For example:
 *  Got 1 label of 50 - looking for the closest value from [0,50,75,100] to add one more
 **/
const adjustZoom = (numOfLabels: number, min: number, max: number) => {
  const up = [LOW_VALUE, HIGH_VALUE, MAX_ZOOM_VALUE].reduce((acc, curr) => {
    const differ = curr - max;
    if (differ > 0 && differ < acc) {
      acc = differ;
    }
    return acc;
  }, MAX_VALUE);

  const down = [MIN_ZOOM_VALUE, LOW_VALUE, HIGH_VALUE].reduce((acc, curr) => {
    const differ = min - curr;
    if (differ > 0 && differ < acc) {
      acc = differ;
    }
    return acc;
  }, MAX_VALUE);

  if (numOfLabels === 0) {
    return {
      max: fixPadding(max + up, true),
      min: fixPadding(min - down),
    };
  }
  if (down < up) {
    // add label from bottom
    return {
      max: fixPadding(max, true),
      min: fixPadding(min - down),
    };
  } else {
    // add label from top
    return {
      max: fixPadding(max + up, true),
      min: fixPadding(min),
    };
  }
};

/** Add padding to zoom in case of upper is 75 and lower is 50  **/
const fixPadding = (value: number, isTop?: boolean) => {
  const addOrSubtract = isTop ? EXTRA_PADDING : -EXTRA_PADDING;
  if (value === HIGH_VALUE || value === LOW_VALUE) {
    return value + addOrSubtract;
  }

  return value;
};
