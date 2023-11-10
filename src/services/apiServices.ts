import FetchAPI from '@/lib/fetchAPI'
import FetchServerAPI from '../lib/fetchServerAPI'

const apiClient = FetchAPI.getInstance()
const apiServer = FetchServerAPI.getInstance()

export { apiClient, apiServer }
