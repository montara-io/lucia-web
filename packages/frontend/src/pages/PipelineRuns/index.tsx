import { DivTitle } from './styles';
import Overview, { OverviewItem } from '../../stories/Overview/Overview';
import Card from '../../stories/Card/Card';
import PageWithTable from '../../components/common/PageWithTable';
import { useNavigate, useParams } from 'react-router-dom';
import { dataFormatterCallback, formatOverview } from './helpers';
import { useState } from 'react';

export const PipelineRunsPage = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState([] as OverviewItem[]);

  const { pipelineId = '' } = useParams();
  return (
    <PageWithTable
      onData={(data) => setOverview(formatOverview(data))}
      fetchUrl={`/pipeline/runs?pipelineId=${pipelineId}`}
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ responseData, navigate, pipelineId })
      }
      id={'pipeline-runs'}
      pageHeader={`Pipeline Runs - ${pipelineId}`}
      tableHeader={'All Runs'}
    >
      <DivTitle>Overview</DivTitle>
      <div>
        <Card>
          <Overview items={overview} />
        </Card>
      </div>
    </PageWithTable>
  );
};

export default PipelineRunsPage;
