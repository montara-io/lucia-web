import classNames from 'classnames';
import React from 'react';
import './BenchmarkGraph.scss';
import { Slider } from 'primereact/slider';
import { isInValid } from '../utils';
import { NO_DATA_MESSAGE } from '../utils/consts';

export type BenchmarkGraphProps = {
  upperRange: { title: string; score: number; hide?: boolean };
  lowerRange: { title: string; score: number; hide?: boolean };
};

const locale = navigator.language;
const BenchmarkGraph: React.FunctionComponent<BenchmarkGraphProps> = ({
  upperRange,
  lowerRange,
}) => {
  const HEIGHT = 140;
  const VALUE_PADDING_TOP = 8;
  const VALUE_PADDING_LOWER = 8;
  let marginTopScore = HEIGHT - (upperRange?.score / 100) * HEIGHT;
  let marginTopLowerScore = HEIGHT - (lowerRange?.score / 100) * HEIGHT;
  let newScoreL;
  let newScoreU;

  if (
    isInValid({ value: upperRange?.score }) ||
    isInValid({ value: lowerRange?.score })
  ) {
    return <div data-testid={NO_DATA_MESSAGE}>{NO_DATA_MESSAGE}</div>;
  }

  return (
    <div className="m-benchmark">
      <div className="body">
        {!upperRange.hide && (
          <label
            className={`lbl-upper-value`}
            style={{ marginTop: `${marginTopScore - VALUE_PADDING_TOP}px` }}
          >
            {upperRange.score}
          </label>
        )}
        {!lowerRange?.hide && (
          <label
            className={`lbl-value`}
            style={{
              marginTop: `${marginTopLowerScore - VALUE_PADDING_TOP}px`,
            }}
          >
            {lowerRange?.score}
          </label>
        )}
        <Slider
          data-testid="m-basic-slider"
          className={classNames(
            'body-slider',
            lowerRange?.hide ? 'hide-lower' : '',
            upperRange?.hide ? 'hide-upper' : '',
          )}
          orientation="vertical"
          value={[
            newScoreL ? newScoreL : lowerRange?.score,
            newScoreU ? newScoreU : upperRange?.score,
          ]}
          range
          disabled
        />
        {!upperRange?.hide && (
          <h1
            className="lbl-upper"
            style={{
              marginTop: `${marginTopScore - VALUE_PADDING_TOP}px`,
            }}
          >
            <span
              title={
                upperRange?.title?.length > 21 ? upperRange?.title : undefined
              }
              className="title"
            >
              {upperRange?.title}
            </span>
          </h1>
        )}
        {!lowerRange?.hide && (
          <h1
            className="lbl-lower"
            style={{
              marginTop: `${marginTopLowerScore - VALUE_PADDING_LOWER}px`,
            }}
          >
            <span
              title={
                lowerRange?.title?.length > 10 ? lowerRange?.title : undefined
              }
              className="title"
            >
              {lowerRange?.title?.length > 10
                ? lowerRange?.title?.substring(0, 6) + '...'
                : lowerRange?.title}
            </span>
          </h1>
        )}
      </div>
    </div>
  );
};

const WrappedBenchmarkGraph = (props) => {
  return <BenchmarkGraph {...props} />;
};
export default WrappedBenchmarkGraph;
