export enum ColumnName {
  pipelineId = 'pipelineId',
  AvgDuration = 'avgDuration',
  lastRunDuration = 'lastRunDuration',
  LastRunDate = 'lastRunDate',
  Duration = 'duration',
  AvgTotalCpuUptime = 'avgTotalCpuUptime',
  TotalCpuUptime = 'totalCpuUptime',
  numberOfJobs = 'numberOfJobs',
  Date = 'date',
  avgTotalBytesRead = 'avgTotalBytesRead',
  avgTotalBytesWritten = 'avgTotalBytesWritten',
  TotalBytesRead = 'totalBytesRead',
  TotalBytesWritten = 'totalBytesWritten',

  jobId = 'jobId',
  avgNumOfExecutors = 'avgNumOfExecutors',
}

export enum ColumnType {
  String,
  Date,
  Number,
}

export enum UnitType {
  Storage = 'storage',
  Duration = 'duration',
  Date = 'date',
}

export const TABLE_COLUMNS = {
  [ColumnName.pipelineId]: {
    title: 'Pipeline Name',
    sortable: true,
    sortType: 'string',
  },
  [ColumnName.AvgDuration]: {
    title: 'Avg. Duration',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText: 'The average time for all pipeline runs',
  },
  [ColumnName.Duration]: {
    title: 'Duration',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText: 'The time it took for the entire pipeline to run',
  },
  [ColumnName.LastRunDate]: {
    title: 'Last run date',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Date,
  },
  [ColumnName.AvgTotalCpuUptime]: {
    title: 'Avg. CPU Uptime',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText:
      'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  },
  [ColumnName.TotalCpuUptime]: {
    title: 'Total CPU Uptime',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText:
      'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  },
  [ColumnName.numberOfJobs]: {
    title: 'Number of Jobs',
    sortable: true,
    sortType: 'number',
    helpIconText: 'The number of jobs in the last pipeline run',
  },
  [ColumnName.Date]: {
    title: 'Date',
    sortable: true,
    sortType: 'string',
  },
  [ColumnName.avgTotalBytesRead]: {
    title: 'Data Read',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText: 'The total number of bytes read across jobs',
  },
  [ColumnName.avgTotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText: 'The total number of bytes written across jobs',
  },
  [ColumnName.TotalBytesRead]: {
    title: 'Data Read',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText: 'The total number of bytes read',
  },
  [ColumnName.TotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText: 'The total number of bytes written',
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
  [ColumnName.lastRunDuration]: {
    title: 'Last Run Duration',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText: 'The duration of the last pipeline run',
  },
};
