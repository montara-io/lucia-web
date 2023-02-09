import { JobRun } from '../../types/JobRun';
import { formatOverview, formatLineChartData } from './helpers';

const jobsMock: JobRun[] = [
  {
    sparkJobRunMetrics: {
      numOfExecutors: 16,
      cpuUtilization: 1.7107604028269299,
      peakMemoryUsage: 0.006478702116578906,
      totalBytesRead: '17902579',
      totalBytesWritten: '10539',
      totalCoresNum: 64,
      totalCpuTimeUsed: 42.017849393,
      totalCpuUptime: 2456.092,
      totalMemoryPerExecutor: 22528.0625,
      totalShuffleRead: '81335',
      totalShuffleWrite: '47648',
    },
    id: 'movie-ratings-14b74a19-7e24-44ab-ad6b-0ca5fb52bd97',
    pipelineRunId: 'emr_demo_pipeline_run_id',
    jobId: 'movie-ratings',
    startDate: '2023-02-08T16:12:00.149Z',
    endDate: '2023-02-08T16:12:36.241Z',
    duration: 0.6015333333333334,
  },
  {
    sparkJobRunMetrics: {
      numOfExecutors: 12,
      cpuUtilization: 1.783869668564559,
      peakMemoryUsage: 0.006571698650936055,
      totalBytesRead: '13319441',
      totalBytesWritten: '7555',
      totalCoresNum: 48,
      totalCpuTimeUsed: 31.280582767,
      totalCpuUptime: 1753.5240000000001,
      totalMemoryPerExecutor: 22528.0625,
      totalShuffleRead: '52737',
      totalShuffleWrite: '35154',
    },
    id: 'movie-ratings-f729766f-e534-4ab8-a67e-9517b3124e90',
    pipelineRunId: 'emr_demo_pipeline_run_id',
    jobId: 'movie-ratings',
    startDate: '2023-02-08T16:12:00.118Z',
    endDate: '2023-02-08T16:12:34.486Z',
    duration: 0.5728000000000001,
  },
  {
    sparkJobRunMetrics: {
      numOfExecutors: 8,
      cpuUtilization: 2.01781369078635,
      peakMemoryUsage: 0.009421351558880383,
      totalBytesRead: '8736303',
      totalBytesWritten: '4571',
      totalCoresNum: 32,
      totalCpuTimeUsed: 20.911248978,
      totalCpuUptime: 1036.332,
      totalMemoryPerExecutor: 22528.0625,
      totalShuffleRead: '29242',
      totalShuffleWrite: '22660',
    },
    id: 'movie-ratings-e493f977-1a3d-42f4-9f8f-5614b6af9ec7',
    pipelineRunId: 'emr_demo_pipeline_run_id',
    jobId: 'movie-ratings',
    startDate: '2023-02-08T16:11:24.299Z',
    endDate: '2023-02-08T16:12:15.153Z',
    duration: 0.8475666666666667,
  },
  {
    sparkJobRunMetrics: {
      numOfExecutors: 4,
      cpuUtilization: 2.274126323860249,
      peakMemoryUsage: 0.005196697816473343,
      totalBytesRead: '3051278',
      totalBytesWritten: '1587',
      totalCoresNum: 16,
      totalCpuTimeUsed: 9.461639018,
      totalCpuUptime: 416.05600000000004,
      totalMemoryPerExecutor: 22528.0625,
      totalShuffleRead: '8186',
      totalShuffleWrite: '8186',
    },
    id: 'movie-ratings-eaee3721-0df9-4741-aef5-fbc1100c22d8',
    pipelineRunId: 'emr_demo_pipeline_run_id',
    jobId: 'movie-ratings',
    startDate: '2023-02-08T16:11:20.611Z',
    endDate: '2023-02-08T16:11:54.840Z',
    duration: 0.5704833333333333,
  },
];

describe('Job History', () => {
  it('should format overview items', () => {
    const result = formatOverview(jobsMock);
    expect(result[0].score).toBe(4);
  });
  it('should format the line chart data', () => {
    const result = formatLineChartData(jobsMock);
    expect(result).toHaveLength(11);
    expect(result[2].scores[0].score).toBe(17.1);
  });
});
