import { InviteSpaceReqBody } from '@/types'
import { apiClient } from '../apiServices'

const fetchInviteSpace = async ({
  email,
  spaceId,
  role,
}: InviteSpaceReqBody) => {
  const path = `/api/space/invitations`
  const body = { email, spaceId, role }

  try {
    const response = await apiClient.post(path, body)
    return response
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}

export { fetchInviteSpace }
