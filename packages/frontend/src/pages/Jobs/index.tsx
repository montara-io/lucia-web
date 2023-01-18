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

const JobsPage = () => {
  const navigate = useNavigate();

  return (
    <PageWithTable
      pageHeader="Jobs"
      id="jobs"
      fallbackHeaderData={[
        {
          field: 'name',
          title: 'Job Name',
          sortType: 'string',
          placeholder: 'Search',
          sortable: true,
          sortField: 'name',
        },
        {
          field: 'avgRuntime',
          title: 'Avg. Runtime',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'avgCoreHours',
          title: 'Avg. Core Hours',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'avgWaitingTime',
          title: 'Avg. Waiting Time',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'explore',
          title: '',
          sortType: 'string',
          sortable: false,
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
                    navigate('/job/123');
                  }}
                >
                  {'Explore Runs'}
                </ActionButton>
              </ExploreButton>
            </>
          ),
        },
      ]}
      fallbackBodyData={[
        {
          name: 'Cohort',
          id: 'cohort',
          avgRuntime: '20 Hrs',
          avgCoreHours: '120 Hrs',
          avgWaitingTime: '30 Hrs.',
        },
        {
          name: 'Feature Engine',
          id: 'featureEngine',
          avgRuntime: '7 Hrs',
          avgCoreHours: '190 Hrs',
          avgWaitingTime: '30 Hrs.',
        },
      ]}
      fetchUrl={'/jobs/summary'}
    />
  );
};

export default JobsPage;
