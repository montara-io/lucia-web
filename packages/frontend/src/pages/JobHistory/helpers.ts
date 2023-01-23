import { arrayAverage } from '../../utils/arrays';
import { OverviewItem } from './../../stories/Overview/Overview';
export type JobRun = {
  pipelineRunId: string;
  jobId: string;
  date: string;
  sparkJobMetrics?: {
    jobRunId: string;
    utilization: number;
    runtime: number;
    waitingTime: number;
    coreHours: number;
    usedMemory: number;
    numberOfCores: number;
    cpuUtilization: number;
    memoryUtilization: number;
  };
};

export const jobsFallback: JobRun[] = [
  {
    pipelineRunId: 'Monty Python',
    jobId: 'Cohort',
    date: '2022-09-05T08:23:25.960Z',
    sparkJobMetrics: {
      jobRunId: 'Monty Python',
      utilization: 20,
      runtime: 20,
      waitingTime: 20,
      coreHours: 20,
      usedMemory: 20,
      numberOfCores: 20,
      cpuUtilization: 20,
      memoryUtilization: 20,
    },
  },
  {
    pipelineRunId: 'Monty Python',
    jobId: 'Cohort',
    date: '2022-09-05T08:23:25.960Z',
    sparkJobMetrics: {
      jobRunId: 'Monty Python',
      utilization: 80,
      runtime: 20,
      waitingTime: 50,
      coreHours: 20,
      usedMemory: 20,
      numberOfCores: 20,
      cpuUtilization: 20,
      memoryUtilization: 20,
    },
  },
];
export type LineChartData = {
  chartTitle: string;
  scores: {
    score: number;
    label: string;
    date: string;
  }[];
};

const metricsToTexts = [
  {
    chartTitle: 'Utilization',
    scoreField: 'utilization',
  },
  {
    chartTitle: 'Avg. Waiting time',
    scoreField: 'waitingTime',
  },
  {
    chartTitle: 'Avg. Runtime',
    scoreField: 'runtime',
  },
  {
    chartTitle: 'Avg. Core Hours',
    scoreField: 'coreHours',
  },
];

export function formatOverview(jobs: JobRun[]): OverviewItem[] {
  return metricsToTexts.map((curr) => ({
    title: curr.chartTitle,
    score: arrayAverage(
      jobs.map((job) => job.sparkJobMetrics?.[curr.scoreField] || 0),
    ),
  }));
}

export function formatLineChartData(jobs: JobRun[]): LineChartData[] {
  return metricsToTexts.map((curr) => ({
    chartTitle: curr.chartTitle,
    scores: jobs.map((job) => ({
      score: job.sparkJobMetrics?.[curr.scoreField] || 0,
      label: job.date.split('T')[0],
      date: job.date.split('T')[0],
    })),
  }));
  // return [
  //   {
  //     chartTitle: 'Utilization',
  //     scores: jobs.map((job) => ({
  //       score: job.sparkJobMetrics?.utilization || 0,
  //       label: job.date.split('T')[0],
  //       date: job.date.split('T')[0],
  //     })),
  //   },
  //   {
  //     chartTitle: 'Avg. Waiting time',
  //     scores: jobs.map((job) => ({
  //       score: job.sparkJobMetrics?.waitingTime || 0,
  //       label: job.date.split('T')[0],
  //       date: job.date.split('T')[0],
  //     })),
  //   },
  // ];
}
