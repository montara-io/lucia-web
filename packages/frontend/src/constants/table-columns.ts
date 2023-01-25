export function getTableColumnDefinition(columnId) {
  try {
    if (!TABLE_COLUMNS[columnId]) {
      throw new Error(`Column not found: ${columnId}`);
    }
    return TABLE_COLUMNS[columnId];
  } catch (error) {
    console.error(error);
    return null;
  }
}

const TABLE_COLUMNS = {
  pipelineId: {
    title: 'Pipeline Name',
    sortable: true,
    sortType: 'string',
  },
  avgRuntime: {
    title: 'Avg. Runtime',
    sortable: true,
    sortType: 'string',
    unit: 'Hrs.',
    helpIconText: 'The average time for all pipeline runs',
  },
  lastRunDate: {
    title: 'Last run date',
    sortable: true,
    sortType: 'string',
  },
  avgCoreHours: {
    title: 'Avg. Core Hours',
    sortable: true,
    sortType: 'string',
    unit: 'Hrs.',
    helpIconText:
      'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  },
  // totalRuntime: {
  //   title: 'Total Runtime',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: 'Hrs.',
  //   helpIconText: 'The time it took to run the entire pipeline',
  // },

  // avgJobCoreHours: {
  //   title: 'Avg. Core Hours',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: 'Hrs.',
  //   helpIconText:
  //     'The sum of the duration of the job executor CPU multiplied by the number of CPUs allocated for the job',
  // },
  // avgUtilization: {
  //   title: 'Avg. Utilization',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: '%',
  //   helpIconText: 'Simple average of the CPU and Peak RAM utilization',
  // },
  // totalCoreHours: {
  //   title: 'Total Core Hrs.',
  //   unit: 'Hrs.',
  //   sortable: true,
  //   sortType: 'string',
  //   helpIconText:
  //     'The sum of the duration of each job executor CPU\n multiplied by the number of CPUs per job.',
  // },
  // date: {
  //   title: 'Date',
  //   sortable: true,
  //   sortType: 'string',
  // },
  // jobId: {
  //   title: 'Job',
  //   sortable: true,
  //   sortType: 'string',
  // },
  // ramUtilization: {
  //   title: 'Peak RAM Utilization',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: '%',
  //   helpIconText:
  //     'The maximum RAM utilization of the job executor during the job run',
  // },
  // utilization: {
  //   title: 'Utilization',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: '%',
  //   helpIconText:
  //     'Simple average of the CPU and Peak RAM utilization of the job',
  // },
  // cpuUtilization: {
  //   title: 'CPU Utilization',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: '%',
  //   helpIconText: 'The average CPU utilization of the job',
  // },
  // runtime: {
  //   title: 'Runtime',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: 'Hrs.',
  // },
  // coreHours: {
  //   title: 'Core Hours',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: 'Hrs.',
  //   helpIconText:
  //     'The sum of the duration of each job executor CPU multiplied by the number of CPUs per job.',
  // },

  // avgJobRuntime: {
  //   title: 'Avg. Runtime',
  //   sortable: true,
  //   sortType: 'string',
  //   unit: 'Hrs.',
  //   helpIconText: 'The average time it took for the job to run',
  // },
};
