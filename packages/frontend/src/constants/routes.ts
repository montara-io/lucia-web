export enum Routes {
  Pipelines = '/pipelines',
  Jobs = '/jobs',
  PipelineRuns = '/pipeline/:pipelineId/runs',
  SinglePipelineRun = '/pipeline/:pipelineId/runs/:pipelineRunId/jobs',
  JobHistory = '/job/:jobId',
}
