import { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { ZOOM_PADDING } from '../../../consts';

import { ChartContainer, Container, Flex, NumericContainer } from './style';

import BasicLineChart from '../../../stories/LineCharts/BasicLineChart/BasicLineChart';
import NumericTrend from '../../../stories/NumericTrend/NumericTrend';

import Card from '../../../stories/Card/Card';

export const ChartNumericTrend = ({
  id,
  chartData,
  numeric,
  small = false,
}): JSX.Element => {
  const themeContext = useContext(ThemeContext);

  if (!chartData) {
    chartData = { data: [], labels: [], range: [] };
  }

  const { data, range } = chartData;
  const { score, percentage, timeText } = numeric;

  return (
    <Card
      {...{
        id,
        color: themeContext.noSeverity,
      }}
    >
      <Container {...{ small }}>
        <Flex {...{ small }}>
          <ChartContainer {...{ small }}>
            <BasicLineChart
              {...{
                data,
                range,
              }}
              zoomPadding={ZOOM_PADDING}
            />
          </ChartContainer>
          <NumericContainer>
            <NumericTrend
              {...{
                primaryNumber: score?.toString(),
                percentageNumber: percentage?.toString(),
                timeText,
                fontSize: 'big',
              }}
            />
          </NumericContainer>
        </Flex>
      </Container>
    </Card>
  );
};
