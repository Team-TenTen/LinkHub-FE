class FetchServerAPI {
  private baseURL: string
  private headers: { [key: string]: string }

  private static instance: FetchServerAPI

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_ADDRESS || ''
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }
  public static getInstance(): FetchServerAPI {
    if (!FetchServerAPI.instance) {
      FetchServerAPI.instance = new FetchServerAPI()
    }
    return FetchServerAPI.instance
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
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: { ...this.headers, ...customHeaders },
      body: JSON.stringify(body),
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
    const data = response
    return data
  }
}
export default FetchServerAPI
