import Card from '../../stories/Card/Card';
import Overview, { OverviewProps } from '../../stories/Overview/Overview';
import ChartNumeric from './ChartNumeric/ChartNumeric';
import { DivTitle, DivTitleContainer } from './styles';

export const JobPage = () => {
  const overviewProps: OverviewProps = {
    data: [
      {
        title: 'Avg. Runtime',
        score: 50,
      },
      {
        title: 'test2',
        score: 50,
      },
      {
        title: 'test2',
        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
    ],
  };
  return (
    <div>
      <DivTitleContainer>{'Cohort'}</DivTitleContainer>
      <Card>
        <Overview {...overviewProps} />
      </Card>
      <DivTitle>Runtime</DivTitle>
      <ChartNumeric key={'TODO1'} />
      <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO2'} />
      <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO3'} />
      <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO4'} />
    </div>
  );
};

export default JobPage;
