const ApiEndPoint = {
  getSpaceDetail: (spaceId: string) => `/space/${spaceId}`,
} as const
export default ApiEndPoint
