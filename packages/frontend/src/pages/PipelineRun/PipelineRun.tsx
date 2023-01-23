import { useNavigate, useParams } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { dataFormatterCallback } from './helpers';

const PipelineRunPage = () => {
  const navigate = useNavigate();
  const { pipelineRunId = '' } = useParams();
  return (
    <PageWithTable
      fetchUrl={`/job/runs/by-pipeline-run-id?pipelineRunId=${pipelineRunId}`}
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ navigate, responseData })
      }
      id={'pipelineRun'}
      pageHeader={'Monty Python Daily 2022-01-01'}
    />
  );
};

export default PipelineRunPage;
