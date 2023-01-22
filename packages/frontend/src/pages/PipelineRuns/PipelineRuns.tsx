import { DivTitle } from './styles';
import Overview, { OverviewProps } from '../../stories/Overview/Overview';
import Card from '../../stories/Card/Card';
import PageWithTable from '../../components/common/PageWithTable';
import { useNavigate } from 'react-router-dom';
import { dataFormatterCallback } from './helpers';

export const PipelineRunsPage = () => {
  const navigate = useNavigate();

  return (
    <PageWithTable
      fetchUrl="/pipeline/runs?pipelineId=Monty Python"
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ responseData, navigate })
      }
      id={'pipeline-runs'}
      pageHeader={'Pipeline Runs'}
      tableHeader={'All Runs'}
    >
      <DivTitle>Monty Python</DivTitle>
      <div>
        <Card>
          <Overview
            items={[
              {
                title: 'Avg. Utilization',
                score: 50,
              },
              {
                title: 'test2',
                score: 50,
              },
              {
                title: 'test3',

                score: 50,
              },
              {
                title: 'test4',

                score: 50,
              },
              {
                title: 'test5',

                score: 50,
              },
              {
                title: 'test6',
                score: 50,
              },
            ]}
          />
        </Card>
      </div>
    </PageWithTable>
  );
};

export default PipelineRunsPage;
