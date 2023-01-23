import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { dataFormatterCallback } from './helpers';

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
