import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { NoJobsContainer } from '../Pipelines/styles';
import { dataFormatterCallback } from './helpers';

export type Pipeline = {
  id: string;
  name: string;
  date: string;
  avgRuntime: string;
  avgCoreHours: string;
  avgWaitingTime: string;
};

function NoJobsElement() {
  return (
    <NoJobsContainer>
      <h2 style={{ textAlign: 'center' }}>
        We're not getting any jobs data... 😔
      </h2>
      <h3>
        <a
          href="https://github.com/montara-io/lucia-web"
          target="_blank"
          rel="noreferrer"
        >
          Here's
        </a>{' '}
        how to get started
      </h3>
    </NoJobsContainer>
  );
}

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
      errorElement={<NoJobsElement />}
    />
  );
};

export default JobsPage;
