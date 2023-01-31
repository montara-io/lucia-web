import { ColumnName } from '../../constants/table-columns';
import { getTableColumnDefinition } from '../../services/table';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';
import { OverviewItem } from './../../stories/Overview/Overview';
export type JobRun = {
  id: string;
  pipelineRunId: string;
  jobId: string;
  date: string;

  sparkJobRunMetrics: {
    id: string;
    jobRunId: string;
    numOfExecutors: number;
    totalMemoryPerExecutor: number;
    totalBytesRead: number;
    totalBytesWritten: number;
    totalShuffleRead: number;
    totalShuffleWrite: number;
    totalCpuTimeUsed: number;
    totalCpuUptime: number;
    peakMemoryUsage: number;
    totalCoresNum: number;
    cpuUtilization: number;
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
    chartTitle: 'CPU Uptime',
    scoreField: ColumnName.TotalCpuUptime,
  },
  {
    chartTitle: 'Bytes Read',
    scoreField: ColumnName.TotalBytesRead,
  },
  {
    chartTitle: 'Bytes Written',
    scoreField: ColumnName.TotalBytesWritten,
  },

  // TODO: Take all metrics
];

export function formatOverview(jobs: JobRun[]): OverviewItem[] {
  const prefix: OverviewItem[] = [
    {
      title: 'Num. of Runs',
      score: jobs.length,
      tooltip: 'How many times the pipeline was triggered',
    },
  ];
  return prefix.concat(
    metricsToTexts.map((curr) => ({
      title: curr.chartTitle,
      score: `${arrayAverage(
        jobs.map((job) => job.sparkJobRunMetrics?.[curr.scoreField] || 0),
      )} ${getTableColumnDefinition(curr.scoreField).unit || '%'}`,
      tooltip: getTableColumnDefinition(curr.scoreField).helpIconText,
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
