import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { dataFormatterCallback } from './helpers';

const PipelineRunPage = () => {
  const navigate = useNavigate();
  return (
    <PageWithTable
      fetchUrl={
        '/job/runs/by-pipeline-run-id?pipelineRunId=cf30f3a3-9194-4f04-9a3d-d93992d22651'
      }
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ navigate, responseData })
      }
      id={'pipelineRun'}
      pageHeader={'Monty Python Daily 2022-01-01'}
    />
  );
};

export default PipelineRunPage;
