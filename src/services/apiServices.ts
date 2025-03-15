import FetchAPI from '@/lib/fetchAPI'
import FetchServerAPI from '../lib/fetchServerAPI'

export interface IFetchConfig {
  baseURL: string
  headers: { [key: string]: string }
}

const apiClient = FetchAPI
const apiServer = FetchServerAPI

export { apiClient, apiServer }
