import { StringRole } from '../consts/Types'

export type UserData = {
  uuid: string
  tenantId: string
  firstName: string
  lastName: string
  avatarURI: string
  reportingTo: { id: string | null }
  roles: StringRole[]
  displayRole: string
  location?: any
  orgStructure?: UserNode
  businessUnit?: { name: string } | null
  managedBusinessUnit?: { name: string; id: string } | null
  hrManagedBUs?: { id: string; name: string }[] | null
  currentManagedBusinessUnitId?: string
}

export type UserNode = {
  id: string
  name?: string
  title?: string
  me?: boolean
  employees?: number
  image?: string
  score?: number
  manager?: any
  parentId?: string
  engagement?: {
    average: number
    passion: number
    involvement: number
    commitment: number
  }
  retention?: {
    average: number
    managerImpact: number
    engagement: number
    career: number
  }
  children?: UserNode[]
}
