import { Connection, EntityManager, ObjectType } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { PipelineRunEntity } from '../src/pipeline/entity/pipeline.entity'
import { JobRunEntity } from '../src/job/entity/job.entity'
import { SparkJobMetricsEntity } from '../src/job/entity/spark-job-metrics.entity'

export const employeeId = '6656448d-ba73-34c5-b109-4c32e569703e'
export const createPipelineBulk = async (connection: Connection, data: any) => {
  for (const pipeline of data) {
    try {
      await connection.getRepository(PipelineRunEntity).save(pipeline)
    } catch (e) {
      console.error(e)
    }
  }
}

export const createPipelineJobRunBulk = async (connection: Connection, data: any) => {
  for (const job of data) {
    try {
      await connection.getRepository(JobRunEntity).save(job)
    } catch (e) {
      console.error(e)
    }
  }
}

export const createSparkJobRunMetricsBulk = async (connection: Connection, data: any) => {
  for (const metrics of data) {
    try {
      await connection.getRepository(SparkJobMetricsEntity).save(metrics)
    } catch (e) {
      console.error(e)
    }
  }
}

export const deleteTableDataFromDB = async (manager: EntityManager, entities: ObjectType<EntityManager>[]) => {
  const queries = []
  for (const entity of entities) {
    queries.push(manager.createQueryBuilder().delete().from(entity).execute())
  }

  await Promise.allSettled(queries)
}

export const getDynamicJsonFile = (filePath: string) => {
  const jsonPath = path.resolve(__dirname, filePath)

  const buffer = fs.readFileSync(jsonPath)
  const json = JSON.parse(buffer.toString())
  return json
}
