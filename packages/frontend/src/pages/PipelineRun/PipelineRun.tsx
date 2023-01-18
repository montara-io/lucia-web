import { useNavigate } from 'react-router-dom'
import PageWithTable from '../../components/common/PageWithTable'
import ActionButton from '../../stories/ActionButton/ActionButton'
import { ExploreButton, GroupContainer, PipelineTitle } from './styles'

const PipelineRunPage = () => {
  const navigate = useNavigate()
  return (
    <PageWithTable
      fallbackHeaderData={[
        {
          field: 'job',
          title: 'Job',
          sortType: 'string',
          placeholder: 'SEARCH',
          sortable: true,
          sortField: 'job',
          template: (data: any) => {
            return (
              <GroupContainer>
                <PipelineTitle data-testid="group-name">
                  {data.job}
                </PipelineTitle>
              </GroupContainer>
            )
          },
        },
        {
          field: 'ramUtilization',
          title: 'RAM Utilization',
          sortType: 'string',
          sortable: true,
        },
        {
          field: 'cpuUtilization',
          title: 'CPU Utilization',
          sortType: 'string',
          sortable: true,
          sortField: 'cpuUtilization',
        },
        {
          field: 'runtime',
          title: 'Runtime',
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
          field: 'waitingTime',
          title: 'Waiting Time',
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
            <ExploreButton>
              <ActionButton
                data-testid="explore-button"
                id="explore-button"
                onClick={() => {
                  navigate('/job/123')
                }}
              >
                {'See Job History'}
              </ActionButton>
            </ExploreButton>
          ),
        },
      ]}
      fetchUrl={'/TODO'}
      fallbackBodyData={[
        {
          job: 'Cohort',
          ramUtilization: '80%',
          cpuUtilization: '70%',
          runtime: '2 Hours',
          coreHours: '120 Hrs. (20% increase)',
          waitingTime: '30 Hrs.',
        },
        {
          job: 'Feature Engine',
          ramUtilization: '80%',
          cpuUtilization: '79 %',
          runtime: '2 Hours',
          coreHours: '120 Hrs. (20% increase)',
          waitingTime: '30 Hrs..',
        },
        {
          job: 'Metric Engine',
          ramUtilization: '80%',
          cpuUtilization: '70%',
          runtime: '2 Hours',
          coreHours: '120 Hrs. (20% increase)',
          waitingTime: '30 Hrs..',
        },
      ]}
      id={'pipelineRun'}
      pageHeader={'Monty Python Daily 2022-01-01'}
    />
  )
}

export default PipelineRunPage
