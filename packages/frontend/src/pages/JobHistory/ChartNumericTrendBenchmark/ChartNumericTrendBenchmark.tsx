import { useEffect, useState } from 'react';
import { ChartNumericTrend } from '../ChartNumericTrend/ChartNumericTrend';

import { Flex } from './style';

export const ChartNumericTrendBenchmark = ({ id, currentScore, scores }) => {
  const [percentageText, setPercentageText] = useState<any>();
  const [percentageNumber, setPercentageNumber] = useState<string>('');

  useEffect(() => {
    if (!scores) return;
    setPercentageText('TODO');
    setPercentageNumber('TODO2');
  }, [scores]);

  return (
    <Flex>
      <ChartNumericTrend
        id={id}
        chartData={{
          data: scores,
        }}
        numeric={{
          score: currentScore,
          percentage: percentageNumber,
          timeText: percentageText,
        }}
      />
    </Flex>
  );
};
