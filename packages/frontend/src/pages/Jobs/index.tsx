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

const JobsPage = () => {
  const navigate = useNavigate();

  return (
    <PageWithTable
      pageHeader="Jobs"
      id="jobs"
      fetchUrl={'/job/all'}
      dataFormatterCallback={(responseData: any) =>
        dataFormatterCallback({ navigate, responseData })
      }
    />
  );
};

export default JobsPage;
