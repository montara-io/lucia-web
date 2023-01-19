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

const PipelinesPage = () => {
  const navigate = useNavigate();

  return (
    <PageWithTable
      pageHeader="Pipelines"
      id="pipelines"
      fallbackHeaderData={[
        {
          field: 'name',
          title: 'Pipeline Name',
          sortType: 'string',
          placeholder: 'Search',
          sortable: true,
          sortField: 'name',
        },
        {
          field: 'date',
          title: 'date 11',
          sortType: 'string',
          sortable: true,
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
                    navigate('/pipeline/123/runs');
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
          name: 'Monty Grail',
          id: 'Monty Grail',
          date: '01-01-2022',
          avgRuntime: '20 Hrs',
          avgCoreHours: '120 Hrs',
          avgWaitingTime: '30 Hrs.',
        },
        {
          name: 'Monty Python',
          id: 'Monty Python',
          date: '01-02-2022',
          avgRuntime: '7 Hrs',
          avgCoreHours: '190 Hrs',
          avgWaitingTime: '30 Hrs.',
        },
      ]}
      fetchUrl={'/pipeline/summary'}
    />
  );
};

export default PipelinesPage;
