import { useNavigate } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import ActionButton from '../../stories/ActionButton/ActionButton';
import { ExploreButton } from './styles';

export type Pipeline = {
  id: string;
  name: string;
  date: string;
  avgRuntime: string;
  avgCoreHours: string;
  avgWaitingTime: string;
};

type PipelineRow = {
  id: string;
  name: string;
  avgRuntime: number;
  numberOfJobs: number;
  avgCoreHours: number;
  avgWaitingTime: number;
  avgUtilization: number;
  lastRunDate: string;
};

const PipelinesPage = () => {
  const navigate = useNavigate();

  const mockBody = [
    {
      name: 'Monty Grail',
      id: 'Monty Grail',
      lastRunDate: '01-01-2022',
      totalRuntime: 20,
      avgRuntime: 53,
      avgCoreHours: 56,
      avgWaitingTime: 5,
      numberOfJobs: 3,
    },
    {
      name: 'Monty Python',
      id: 'Monty Python',
      lastRunDate: '01-02-2022',
      avgRuntime: 78,
      avgCoreHours: 15,
      avgWaitingTime: 3,
      avgUtilization: 50,
      numberOfJobs: 2,
    },
  ];

  const mockHeader = [
    {
      field: 'name',
      title: 'Pipeline Name',
      placeholder: 'Search',
    },
    {
      field: 'avgRuntime',
      title: 'Total Runtime',
    },
    {
      field: 'lastRunDate',
      title: 'Last run date',
    },
    {
      field: 'avgRuntime',
      title: 'Avg. Runtime',
    },
    {
      field: 'avgCoreHours',
      title: 'Avg. Core Hours',
    },
    {
      field: 'avgWaitingTime',
      title: 'Avg. Waiting Time',
    },
    {
      field: 'explore',
      title: '',
      headerStyle: {
        cellWidth: '12rem',
      },
      template: (data: any) => (
        <>
          <ExploreButton>
            <ActionButton
              data-testid="explore-button"
              id="explore-button"
              onClick={() => {
                navigate('/pipeline/123/runs');
              }}
            >
              {'Explore Runs'}
            </ActionButton>
          </ExploreButton>
        </>
      ),
    },
  ];

  function dataFormatterCallback() {
    return {
      headerData: mockHeader,
      bodyData: mockBody,
    };
  }

  return (
    <PageWithTable
      pageHeader="Pipelines"
      id="pipelines"
      dataFormatterCallback={dataFormatterCallback}
      fetchUrl={'/pipeline/all'}
      fallbackBodyData={mockBody}
      fallbackHeaderData={mockHeader}
    />
  );
};

export default PipelinesPage;
