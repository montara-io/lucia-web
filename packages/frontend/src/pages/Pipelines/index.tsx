import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { ApiUrls } from '../../constants/api-urls';
import { Routes } from '../../constants/routes';
import { dataFormatterCallback } from './helpers';

export type Pipeline = {
  id: string;
  name: string;
  date: string;
  avgRuntime: string;
  avgTotalCpuUptime: string;
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
        dataFormatterCallback({ responseData, navigate })
      }
      onData={(responseData) => {
        if (!responseData || !responseData?.length) {
          navigate(Routes.Jobs);
        }
      }}
      fetchUrl={ApiUrls.GetAllPipelines}
    />
  );
};

export default PipelinesPage;
