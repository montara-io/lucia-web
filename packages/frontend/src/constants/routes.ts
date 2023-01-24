export enum Routes {
  Pipelines = '/pipelines',
  Jobs = '/jobs',
  PipelineRuns = '/pipeline/:pipelineId/runs',
  PipelineRun = '/pipeline/:pipelineId/runs/:pipelineRunId/jobs',
  JobHistory = '/job/:jobId',
}
