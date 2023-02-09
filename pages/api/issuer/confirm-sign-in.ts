import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { userManagementClient } from '../clients/user-management'

type HandlerResponse = {
  consoleAuthToken: string;
};

const requestSchema = z
  .object({
    isSignUp: z.boolean(),
    token: z.string(),
    confirmationCode: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const { isSignUp, token, confirmationCode } = requestSchema.parse(req.body)

  let consoleAuthToken: string
  if (isSignUp) {
    const response = await userManagementClient.confirmSignup({ token, confirmationCode })
    consoleAuthToken = response.consoleAuthToken
  } else {
    const response = await userManagementClient.confirmLogin({ token, confirmationCode })
    consoleAuthToken = response.consoleAuthToken
  }

  res.status(200).json({ consoleAuthToken })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
