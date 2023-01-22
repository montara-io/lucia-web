import { useEffect, useState } from 'react';
import { get } from '../../services/http.service';
import Card from '../../stories/Card/Card';
import Loading from '../../stories/Loading/Loading';
import Overview, { OverviewItem } from '../../stories/Overview/Overview';
import ChartNumeric from './ChartNumeric/ChartNumeric';
import {
  formatLineChartData,
  formatOverview,
  jobsFallback,
  LineChartData,
} from './helpers';
import { DivTitle, DivTitleContainer } from './styles';

export const JobPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overview, setOverview] = useState([] as OverviewItem[]);
  const [lineChartData, setLineChartData] = useState([] as LineChartData[]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseData = await get('/job/runs/by-job-id?jobId=1');
        setOverview(formatOverview(responseData || jobsFallback));
        setLineChartData(formatLineChartData(responseData || jobsFallback));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <DivTitleContainer>{'Cohort'}</DivTitleContainer>
      <Card>
        <Overview items={overview} />
      </Card>
      {lineChartData.map((currLineChartData) => (
        <>
          <DivTitle>{currLineChartData.chartTitle}</DivTitle>
          <ChartNumeric
            scores={currLineChartData.scores}
            key={currLineChartData.chartTitle}
          />
        </>
      ))}

      {/* <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO2'} />
      <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO3'} />
      <DivTitle>Avg. Waiting Time</DivTitle>
      <ChartNumeric key={'TODO4'} /> */}
    </div>
  );
};

export default JobPage;
