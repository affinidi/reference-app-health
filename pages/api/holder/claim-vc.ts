import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { cloudWalletClient } from '../clients/cloud-wallet-client'

type HandlerResponse = {
  credentialId: string
};

const requestSchema = z
  .object({
    credentialOfferRequestToken: z.string(),
  })
  .strict()

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const accessToken = authenticateCloudWallet(req)

  const { credentialOfferRequestToken } = requestSchema.parse(req.body)

  const { credentialIds } = await cloudWalletClient.claimCredentials({ credentialOfferRequestToken }, { accessToken })

  res.status(200).json({ credentialId: credentialIds[0] })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
