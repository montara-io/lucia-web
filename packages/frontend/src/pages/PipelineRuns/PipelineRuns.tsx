import {
  DivTitle,
  ExploreButton,
  GroupContainer,
  PipelineTitle,
} from './styles';
import Overview, { OverviewProps } from '../../stories/Overview/Overview';
import Card from '../../stories/Card/Card';
import PageWithTable from '../../components/common/PageWithTable';
import ActionButton from '../../stories/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';

export const PipelineRunsPage = () => {
  const navigate = useNavigate();
  const overviewProps: OverviewProps = {
    data: [
      {
        title: 'Avg. Utilization',
        score: 50,
      },
      {
        title: 'test2',
        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
      {
        title: 'test2',

        score: 50,
      },
      {
        title: 'test2',
        score: 50,
      },
    ],
  };
  return (
    <PageWithTable
      fetchUrl="/asdasdf"
      fallbackHeaderData={[
        {
          field: 'name',
          title: 'Pipeline Name',
          sortType: 'string',
          placeholder: 'Search',
          sortable: true,
          sortField: 'name',
          template: (data: any) => {
            return (
              <GroupContainer>
                <PipelineTitle data-testid="group-name">
                  {data.name}
                </PipelineTitle>
              </GroupContainer>
            );
          },
        },
        {
          field: 'date',
          title: 'date',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'totalRuntime',
          title: 'Total Runtime',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'coreHours',
          title: 'Core Hours',
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
                    navigate('/pipeline/:pipelinId/runs/:pipelineRunId/jobs');
                  }}
                >
                  {'Explore Jobs'}
                </ActionButton>
              </ExploreButton>
            </>
          ),
        },
      ]}
      fallbackBodyData={[
        {
          name: 'Monty Python 02/01',
          id: 'Monty Python 02/01',
          date: '01-01-2022',
          totalRuntime: '2 Hrs (20% increase)',
          coreHours: '120 Hrs (20% increase)',
          avgWaitingTime: '30 Hrs.',
        },
        {
          name: 'Monty Python 01/01',
          id: 'Monty Python 01/01',
          date: '01-02-2022',
          totalRuntime: '2 Hrs (30% increase)',
          coreHours: '120 Hrs (20% increase)',
          avgWaitingTime: '30 Hrs.',
        },
      ]}
      id={'pipeline-runs'}
      pageHeader={'Pipeline Runs'}
      tableHeader={'All Runs'}
    >
      <DivTitle>Monty Python</DivTitle>
      <div>
        <Card>
          <Overview {...overviewProps} />
        </Card>
      </div>
    </PageWithTable>
  );
};

export default PipelineRunsPage;
