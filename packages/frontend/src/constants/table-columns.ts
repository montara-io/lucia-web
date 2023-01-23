export const TABLE_COLUMNS = {
  pipelineId: {
    title: 'Pipeline Name',
    sortable: true,
    sortType: 'string',
  },
  lastRunDate: {
    title: 'Last run date',
    sortable: true,
    sortType: 'string',
  },
  totalRuntime: {
    title: 'Total Runtime',
    sortable: true,
    sortType: 'string',
    unit: '%',
  },
  avgCoreHours: {
    title: 'Avg. Core Hours',
    sortable: true,
    sortType: 'string',
  },
  avgUtilization: {
    title: 'Avg. Utilization',
    unit: '%',
  },
  totalCoreHours: {
    title: 'Total Core Hrs.',
    unit: 'Hrs.',
  },
};
