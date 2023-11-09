//import { apiClient } from "@/lib/fetchAPI"
import apiClient from '../apiClient'

const getSpaceDetail = async (spaceId: string) => {
  try {
    const response = await apiClient.get(`/spaces/${spaceId}`, {})
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { getSpaceDetail }
