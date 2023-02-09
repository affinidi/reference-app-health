import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { VerifiableCredential } from 'types/vc'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { cloudWalletClient } from '../clients/cloud-wallet-client'

type HandlerResponse = {
  vcs: VerifiableCredential[]
};

const VC_TYPE = 'EventEligibility'

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const accessToken = authenticateCloudWallet(req)

  const { vcs } = await cloudWalletClient.getCredentials({}, { accessToken })

  res.status(200).json({ vcs: vcs.filter(vc => vc.type.includes(VC_TYPE)) })
}

export default use(allowedHttpMethods('GET'), errorHandler)(handler)
