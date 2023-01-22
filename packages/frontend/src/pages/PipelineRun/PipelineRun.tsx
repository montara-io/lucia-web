import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { dataFormatterCallback } from './helpers';
import { GroupContainer, PipelineTitle } from './styles';

const PipelineRunPage = () => {
  const navigate = useNavigate();
  return (
    <PageWithTable
      fetchUrl={'/job/runs/by-pipeline-run-id?pipelineRunId=123'}
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ navigate, responseData })
      }
      id={'pipelineRun'}
      pageHeader={'Monty Python Daily 2022-01-01'}
    />
  );
};

export default PipelineRunPage;
