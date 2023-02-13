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
  AvgNumOfExecutors = 'avgNumOfExecutors',
  NumOfExecutors = 'numOfExecutors',
  TotalMemoryPerExecutor = 'totalMemoryPerExecutor',
  TotalShuffleRead = 'totalShuffleRead',
  TotalShuffleWrite = 'totalShuffleWrite',
  TotalCpuTimeUsed = 'totalCpuTimeUsed',
  PeakMemoryUsage = 'peakMemoryUsage',
  TotalCoresNum = 'totalCoresNum',
  CpuUtilization = 'cpuUtilization',
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
  Percentage = 'percentage',
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
      'The sum of the lifetime duration of each executor multiplied by the number of CPUs per executor (number of cores). The value is expressed in seconds.',
  },
  [ColumnName.TotalCpuUptime]: {
    title: 'CPU Uptime',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText:
      'The sum of the lifetime duration of each executor multiplied by the number of CPUs per executor (number of cores). The value is expressed in seconds.',
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
    helpIconText:
      'Total number of bytes while reading data from org.apache.spark.rdd.HadoopRDD or from persisted data.',
    columnType: ColumnType.Number,
  },
  [ColumnName.TotalBytesRead]: {
    title: 'Data Read',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText:
      'Total number of bytes while reading data from org.apache.spark.rdd.HadoopRDD or from persisted data.',
    columnType: ColumnType.Number,
  },
  [ColumnName.avgTotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText:
      'Total number of bytes associated with external data writing (e.g. to a distributed filesystem), defined only in tasks with output.',
    columnType: ColumnType.Number,
  },
  [ColumnName.TotalBytesWritten]: {
    title: 'Data Written',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText:
      'Total number of bytes associated with external data writing (e.g. to a distributed filesystem), defined only in tasks with output.',
    columnType: ColumnType.Number,
  },
  [ColumnName.jobId]: {
    title: 'Job',
    sortable: true,
    sortType: 'string',
  },

  [ColumnName.AvgNumOfExecutors]: {
    title: 'Avg. Number of Executors',
    sortable: true,
    sortType: 'number',
    helpIconText: 'The average number of executors used across jobs',
  },
  [ColumnName.NumOfExecutors]: {
    title: '# of Executors',
    sortable: true,
    sortType: 'number',
    helpIconText: 'The number of executors used',
  },
  [ColumnName.lastRunDuration]: {
    title: 'Last Run Duration',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText: 'The duration of the last pipeline run',
  },
  [ColumnName.TotalMemoryPerExecutor]: {
    title: 'Memory / Executor',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText: 'The total memory per executor',
    columnType: ColumnType.Number,
  },
  [ColumnName.TotalShuffleRead]: {
    title: 'Shuffle Read',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText:
      'Total number of bytes read in shuffle operations (both local and remote), summed from all the executors.',
  },
  [ColumnName.TotalShuffleWrite]: {
    title: 'Shuffle Write',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Storage,
    helpIconText:
      'Total number of bytes written in shuffle operations, summed from all the executors.',
    columnType: ColumnType.Number,
  },
  [ColumnName.TotalCpuTimeUsed]: {
    title: 'CPU Time Used',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Duration,
    helpIconText:
      'Sum of all the executors CPU time. CPU time of the executor is the time it spent running all the tasks. This includes time fetching shuffle data. The value is expressed in seconds.',
    columnType: ColumnType.Number,
  },
  [ColumnName.PeakMemoryUsage]: {
    title: 'Peak Memory Usage',
    sortable: true,
    sortType: 'string',
    unit: UnitType.Percentage,
    helpIconText:
      'The maximum memory usage observed from all the executors, (including Java Virtual Machine memory usage and Python processes memory usage).The total available memory is inferred from the Spark configurations.For each executor: total memory used in the executor/total available memory of the executor.',
  },
  [ColumnName.TotalCoresNum]: {
    title: '# of Cores',
    sortable: true,
    sortType: 'number',
    helpIconText: 'Number of cores available in all the executors.',
  },
  [ColumnName.CpuUtilization]: {
    title: 'CPU Utilization',
    sortable: true,
    sortType: 'number',
    helpIconText: 'Total CPU time used/Total CPU uptime.',
    unit: UnitType.Percentage,
  },
};
