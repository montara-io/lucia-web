import { ChartNumericTrendBenchmark } from '../ChartNumericTrendBenchmark/ChartNumericTrendBenchmark';

export const ChartNumeric = ({ isSmall = true }) => {
  const id = `runtime-history`;

  const scores = [
    { score: 70, label: '01/01' },
    { score: 95, label: '01/02' },
    { score: 80, label: '01/03' },
    { score: 30, label: '01/04' },
  ];
  const currentScore = 45;

  return (
    <ChartNumericTrendBenchmark
      id={id}
      currentScore={currentScore}
      scores={scores}
    />
  );
};

export default ChartNumeric;
