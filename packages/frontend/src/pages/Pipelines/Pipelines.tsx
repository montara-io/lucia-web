import { useNavigate } from 'react-router-dom';
import PageWithTable, {
  DataFormatterResponse,
} from '../../components/common/PageWithTable';
import ActionButton from '../../stories/ActionButton/ActionButton';
import { dataFormatterCallback } from './helpers';
import { ExploreButton } from './styles';

export type Pipeline = {
  id: string;
  name: string;
  date: string;
  avgRuntime: string;
  avgCoreHours: string;
  avgWaitingTime: string;
};

export type PipelineAllResponse = {
  id: string;
  pipelineId: string;
  totalRuntime: number;
  numberOfJobs: number;
  totalCoreHours: number;
  avgWaitingTime: number;
  avgUtilization: number;
  avgCpuUtilization: number;
  avgMemoryUtilization: number;
};

const PipelinesPage = () => {
  const navigate = useNavigate();

  return (
    <PageWithTable
      pageHeader="Pipelines"
      id="pipelines"
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ responseData, navigate } as any)
      }
      fetchUrl={'/pipeline/all'}
    />
  );
};

export default PipelinesPage;
