import { NextApiRequest } from 'next'
import { ApiError } from '../api-error'

export function authenticateUserManagement(req: NextApiRequest): string {
  const consoleAuthToken = req.headers['authorization']

  if (!consoleAuthToken) {
    throw new ApiError({
      code: 'USER_MANAGEMENT_NOT_AUTHENTICATED',
      message: 'Console auth token is not present in the "Authorization" header',
      httpStatusCode: 401,
    })
  }

  return consoleAuthToken
}
