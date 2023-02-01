import { ColumnName } from '../../constants/table-columns';
import { formatColumn, getTableColumnDefinition } from '../../services/table';
import { JobRun } from '../../types/JobRun';
import { arrayAverage } from '../../utils/arrays';
import { formatDate } from '../../utils/date';
import { OverviewItem } from './../../stories/Overview/Overview';

export type LineChartData = {
  chartTitle: string;
  scores: {
    score: number;
    label: string;
    date: string;
  }[];
};

const PageMetrics = [
  ColumnName.NumOfExecutors,
  ColumnName.TotalMemoryPerExecutor,
  ColumnName.TotalBytesRead,
  ColumnName.TotalBytesWritten,
  ColumnName.TotalShuffleRead,
  ColumnName.TotalShuffleWrite,
  ColumnName.TotalCpuTimeUsed,
  ColumnName.TotalCpuUptime,
  ColumnName.PeakMemoryUsage,
  ColumnName.TotalCoresNum,
  ColumnName.CpuUtilization,
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
    PageMetrics.map((currMetric) => ({
      title: getTableColumnDefinition(currMetric).title,
      score: formatColumn({
        columnName: currMetric,
        columnValue: arrayAverage(
          jobs.map((job) => job.sparkJobRunMetrics?.[currMetric] || 0),
        ),
      }),

      tooltip: getTableColumnDefinition(currMetric).helpIconText,
    })),
  );
}

export function formatLineChartData(jobs: JobRun[]): LineChartData[] {
  return PageMetrics.map((currMetric) => ({
    chartTitle: getTableColumnDefinition(currMetric).title,
    scores: jobs.map((job) => ({
      score: job.sparkJobRunMetrics?.[currMetric] || 0,
      label: formatDate(job.startDate),
      date: formatDate(job.startDate),
    })),
  }));
}
