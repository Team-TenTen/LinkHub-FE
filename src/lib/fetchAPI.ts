class FetchAPI {
  private baseURL: string
  private headers: { [key: string]: string }

  private static instance: FetchAPI

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS || ''
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  public static getInstance(): FetchAPI {
    if (!FetchAPI.instance) {
      FetchAPI.instance = new FetchAPI()
    }
    return FetchAPI.instance
  }
  public setBaseURL(url: string): void {
    this.baseURL = url
  }
  public setDefaultHeader(key: string, value: string): void {
    this.headers[key] = value
  }
  public async get(
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: { ...this.headers, ...customHeaders },
      ...nextInit,
    })
    const data = response.json()
    return data
  }
  public async post(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    const data = response.json()
    return data
  }
  public async put(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    const data = response.json()
    return data
  }
  public async delete(
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: { ...this.headers, ...customHeaders },
      ...nextInit,
    })
    return response
  }
  public async patch(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return response
  }
}
export default FetchAPI
