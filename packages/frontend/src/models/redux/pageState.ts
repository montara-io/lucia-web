import { Pages } from '../../consts'

export type PageState = {
  loading: boolean
  page?: Pages
  data?: any
}
