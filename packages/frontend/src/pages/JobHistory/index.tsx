import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../services/http.service';
import Card from '../../stories/Card/Card';
import Loading from '../../stories/Loading/Loading';
import Overview, { OverviewItem } from '../../stories/Overview/Overview';
import ChartNumeric from './ChartNumeric/ChartNumeric';
import { formatLineChartData, formatOverview, LineChartData } from './helpers';
import { DivTitle, DivTitleContainer } from './styles';

export const JobPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [overview, setOverview] = useState([] as OverviewItem[]);
  const [lineChartData, setLineChartData] = useState([] as LineChartData[]);
  const { jobId = '' } = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseData = await get(`/job/runs/by-job-id?jobId=${jobId}`);
        setOverview(formatOverview(responseData));
        setLineChartData(formatLineChartData(responseData));
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
      <DivTitleContainer>{jobId} - Over Time</DivTitleContainer>
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
    </div>
  );
};

export default JobPage;
