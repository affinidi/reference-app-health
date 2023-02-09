import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { verifierClient } from '../clients/verifier-client'

type HandlerResponse = {
  isValid: boolean
  errors: string[]
}

const requestSchema = z
  .object({
    vc: z.any(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const { vc } = requestSchema.parse(req.body)

  const verificationResult = await verifierClient.verifyCredentials({
    verifiableCredentials: [vc]
  })

  res.status(200).json(verificationResult)
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
