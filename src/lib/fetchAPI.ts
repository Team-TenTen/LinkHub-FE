import { notify } from '@/components/common/Toast/Toast'
import { IFetchConfig } from '@/services/apiServices'

const defaultConfig: IFetchConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS || '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const handleResponse = async (response: Response, type?: string) => {
  if (!response.ok) {
    const data = await response.json()
    switch (response.status) {
      case 401:
        notify('error', '인증되지 않은 사용자입니다.')
        break
      case 404:
        notify(
          'error',
          `${data.errorMessage}` || '해당하는 요청을 찾을 수 없습니다.',
        )
        break
      case 500:
        notify('error', `${data.errorMessage}` || '서버에 오류가 발생했습니다.')
        break
      default:
        notify(
          'error',
          `${data.errorMessage}` || '알 수 없는 오류가 발생했습니다.',
        )
        break
    }
    return data
  }
  return type === 'delete' ? response : response.json()
}

export const createFetchAPI = (customConfig: Partial<IFetchConfig> = {}) => {
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
    return handleResponse(response)
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
    return handleResponse(response)
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
    return handleResponse(response)
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
    return handleResponse(response, 'delete')
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
    return handleResponse(response)
  }

  return {
    get,
    post,
    put,
    delete: del, // delete는 예약어라서 del로 정의
    patch,
  }
}

export const fetchAPI = createFetchAPI()

export default fetchAPI
