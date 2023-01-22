import { DivTitle } from './styles';
import Overview, { OverviewItem } from '../../stories/Overview/Overview';
import Card from '../../stories/Card/Card';
import PageWithTable from '../../components/common/PageWithTable';
import { useNavigate } from 'react-router-dom';
import {
  dataFormatterCallback,
  formatOverview,
  responseDataFallback,
} from './helpers';
import { useState } from 'react';

export const PipelineRunsPage = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState([] as OverviewItem[]);
  return (
    <PageWithTable
      onData={(data) =>
        setOverview(formatOverview(data || responseDataFallback))
      }
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
          <Overview items={overview} />
        </Card>
      </div>
    </PageWithTable>
  );
};

export default PipelineRunsPage;
