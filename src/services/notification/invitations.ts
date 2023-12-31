import { InvitationsReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchGetUnCheckedNotifications = async () => {
  const path = '/api/notification/unchecked'

  try {
    const response = await apiClient.get(path)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

const fetchGetInvitations = async ({
  pageNumber,
  pageSize,
}: InvitationsReqBody) => {
  const path = '/api/notification/invitations'
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  }
  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await apiClient.get(`${path}?${queryString}`)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchGetUnCheckedNotifications, fetchGetInvitations }
