import { TABLE_COLUMNS } from '../../constants/table-columns';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';
import { OverviewItem } from './../../stories/Overview/Overview';
export type JobRun = {
  pipelineRunId: string;
  jobId: string;
  date: string;
  sparkJobRunMetrics?: {
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
    chartTitle: 'Runtime',
    scoreField: 'runtime',
    unit: 'Hrs.',
  },
  {
    chartTitle: 'Core Hours',
    scoreField: 'coreHours',
    unit: 'Hrs.',
  },
];

export function formatOverview(jobs: JobRun[]): OverviewItem[] {
  const prefix: OverviewItem[] = [
    { title: 'Num. of Runs', score: jobs.length },
  ];
  return prefix.concat(
    metricsToTexts.map((curr) => ({
      title: curr.chartTitle,
      score: `${arrayAverage(
        jobs.map((job) => job.sparkJobRunMetrics?.[curr.scoreField] || 0),
      )} ${curr.unit || '%'}`,
      tooltip: TABLE_COLUMNS[curr.scoreField].helpIconText,
    })),
  );
}

export function formatLineChartData(jobs: JobRun[]): LineChartData[] {
  return metricsToTexts.map((curr) => ({
    chartTitle: curr.chartTitle,
    scores: jobs.map((job) => ({
      score: job.sparkJobRunMetrics?.[curr.scoreField] || 0,
      label: formatDate(job.date),
      date: formatDate(job.date),
    })),
  }));
}
