export enum ColumnName {
  pipelineId = 'pipelineId',
  avgRuntime = 'avgRuntime',
  lastRunDate = 'lastRunDate',
  avgTotalCpuUptime = 'avgTotalCpuUptime',
  TotalCpuUptime = 'totalCpuUptime',
  numberOfJobs = 'numberOfJobs',
  date = 'date',
  avgTotalBytesRead = 'avgTotalBytesRead',
  avgTotalBytesWritten = 'avgTotalBytesWritten',
  TotalBytesRead = 'totalBytesRead',
  TotalBytesWritten = 'totalBytesWritten',

  avgUtilization = 'avgUtilization',
  jobId = 'jobId',
  avgNumOfExecutors = 'avgNumOfExecutors',
}

export const TABLE_COLUMNS = {
  [ColumnName.pipelineId]: {
    title: 'Pipeline Name',
    sortable: true,
    sortType: 'string',
  },
  [ColumnName.avgRuntime]: {
    title: 'Avg. Runtime',
    sortable: true,
    sortType: 'string',
    unit: 'Hrs.',
    helpIconText: 'The average time for all pipeline runs',
  },
  [ColumnName.lastRunDate]: {
    title: 'Last run date',
    sortable: true,
    sortType: 'string',
  },
  [ColumnName.avgTotalCpuUptime]: {
    title: 'Avg. CPU Uptime',
    sortable: true,
    sortType: 'string',
    unit: 'Hrs.',
    helpIconText:
      'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  },
  [ColumnName.TotalCpuUptime]: {
    title: 'Total CPU Uptime',
    sortable: true,
    sortType: 'string',
    unit: 'Hrs.',
    helpIconText:
      'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  },
  [ColumnName.numberOfJobs]: {
    title: 'Number of Jobs',
    sortable: true,
    sortType: 'number',
  },
  [ColumnName.date]: {
    title: 'Date',
    sortable: true,
    sortType: 'string',
  },
  [ColumnName.avgTotalBytesRead]: {
    title: 'Data Read',
    sortable: true,
    sortType: 'string',
    unit: 'Bytes',
    helpIconText: 'The total number of bytes read across jobs',
  },
  [ColumnName.avgTotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: 'Bytes',
    helpIconText: 'The total number of bytes written across jobs',
  },
  [ColumnName.TotalBytesRead]: {
    title: 'Data Read',
    sortable: true,
    sortType: 'string',
    unit: 'Bytes',
    helpIconText: 'The total number of bytes read',
  },
  [ColumnName.TotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: 'Bytes',
    helpIconText: 'The total number of bytes written',
  },
  [ColumnName.avgUtilization]: {
    title: 'Avg. Utilization',
    sortable: true,
    sortType: 'string',
    unit: '%',
    helpIconText: 'Simple average of the CPU and Peak RAM utilization',
  },
  [ColumnName.jobId]: {
    title: 'Job',
    sortable: true,
    sortType: 'string',
  },

  [ColumnName.avgNumOfExecutors]: {
    title: 'Avg. Number of Executors',
    sortable: true,
    sortType: 'number',
    helpIconText: 'The average number of executors used across jobs',
  },
};
