import { NextApiRequest } from 'next'
import { ApiError } from '../api-error'
import { issuerLogin, issuerPassword } from '../env'

export function authenticateIssuer(req: NextApiRequest): void {
  const authorization = req.headers['authorization']

  if (authorization?.startsWith('Basic ')) {
    const [login, password] = authorization.slice('Basic '.length).split(':')
    if (login === issuerLogin && password === issuerPassword) {
      return
    }
  }

  throw new ApiError({
    code: 'ISSUER_AUTH_NOT_PROVIDED',
    message: 'Basic auth for issuer is not provided in the "Authorization" header',
    httpStatusCode: 401,
  })
}
