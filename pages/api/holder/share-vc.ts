import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { VerifiableCredential } from 'types/vc'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { cloudWalletClient } from '../clients/cloud-wallet-client'

type HandlerResponse = {
  vc: VerifiableCredential,
  qrCode: string
  sharingUrl: string
};

const requestSchema = z
  .object({
    id: z.string(),
  })
  .strict()

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const accessToken = authenticateCloudWallet(req)

  const { id } = requestSchema.parse(req.body)

  const { vc } = await cloudWalletClient.getCredentialById({ id }, { accessToken })
  const { qrCode, sharingUrl } = await cloudWalletClient.shareCredential({ id }, { accessToken })

  res.status(200).json({ vc, qrCode, sharingUrl })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
