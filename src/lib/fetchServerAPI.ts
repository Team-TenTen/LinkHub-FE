import { IFetchConfig } from '@/services/apiServices'

const defaultConfig: IFetchConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_ADDRESS || '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

export const createFetchServerAPI = (
  customConfig: Partial<IFetchConfig> = {},
) => {
  let config: IFetchConfig = { ...defaultConfig, ...customConfig }

  const get = async (
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ) => {
    const response = await fetch(`${config.baseURL}${endpoint}`, {
      method: 'GET',
      headers: { ...config.headers, ...customHeaders },
      ...nextInit,
    })
    const data = response.json()
    return data
  }

  const post = async (
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ) => {
    const response = await fetch(`${config.baseURL}${endpoint}`, {
      method: 'POST',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...config.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return response
  }

  const put = async (
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ) => {
    const response = await fetch(`${config.baseURL}${endpoint}`, {
      method: 'PUT',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...config.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return response
  }

  const del = async (
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ) => {
    const response = await fetch(`${config.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: { ...config.headers, ...customHeaders },
      ...nextInit,
    })
    return response
  }

  const patch = async (
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ) => {
    const response = await fetch(`${config.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...config.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return response
  }

  return {
    get,
    post,
    put,
    delete: del,
    patch,
  }
}

export const fetchServerAPI = createFetchServerAPI()

export default fetchServerAPI
