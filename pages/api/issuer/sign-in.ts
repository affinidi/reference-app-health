import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { userManagementClient } from '../clients/user-management'

type HandlerResponse = {
  token: string
  isSignUp: boolean
}

const requestSchema = z.object({
  username: z.string(),
}).strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const { username } = requestSchema.parse(req.body)

  let token: string
  let isSignUp = true
  try {
    const response = await userManagementClient.signup({ username })
    token = response.token
  } catch (error: any) {
    if (error.code === 'COR-7') {
      const response = await userManagementClient.login({ username })
      token = response.token
      isSignUp = false
    } else {
      throw error
    }
  }

  res.status(200).json({ isSignUp, token })
};

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
