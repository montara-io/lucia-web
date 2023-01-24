import { MAX_ZOOM_VALUE, MIN_ZOOM_VALUE } from './consts';

/** return object that represent the min max for zoom in trajectory chart **/
export const getMinMaxViewForTrajectory = (
  data?: any,
  dynamicZoom = false,
  padding = 10,
) => {
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
