import { ChartNumericTrendBenchmark } from '../ChartNumericTrendBenchmark/ChartNumericTrendBenchmark';

export type ChartNumericProps = {
  scores: { label: string; score: number }[];
};

export const ChartNumeric = ({ scores }: ChartNumericProps) => {
  const id = `runtime-history`;

  return (
    <ChartNumericTrendBenchmark
      id={id}
      currentScore={scores[scores.length - 1].score}
      scores={scores}
    />
  );
};

export default ChartNumeric;
