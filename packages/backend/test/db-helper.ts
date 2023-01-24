import { Connection, EntityManager, ObjectType } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'
import { SparkJobRunEntity } from '../src/entity/spark-job-run.entity'

export const employeeId = '6656448d-ba73-34c5-b109-4c32e569703e'
export const createSparkJobRunBulk = async (connection: Connection, data: any) => {
  for (const pipeline of data) {
    try {
      await connection.getRepository(SparkJobRunEntity).save(pipeline)
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
