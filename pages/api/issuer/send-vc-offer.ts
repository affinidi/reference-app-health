// TODO:
import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { authenticateIssuer } from '../helpers/authenticate-issuer'
import { issuanceClient } from '../clients/issuance-client'
import { issuerProjectDid, issuerProjectId } from '../env'

const requestSchema = z
  .object({
    credentialSubject: z.any(),
    holderEmail: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  authenticateIssuer(req)

  const { credentialSubject, holderEmail } = requestSchema.parse(req.body)

  const { id: issuanceId } = await issuanceClient.createIssuance({
    projectId: issuerProjectId,
    template: {
      issuerDid: issuerProjectDid,
      verification: {
        method: 'email',
      },
      walletUrl: 'http://',
      schema: {
        type: 'EventEligibility',
        jsonSchemaUrl: 'https://schema.affinidi.com/EventEligibilityV1-0.json',
        jsonLdContextUrl: 'https://schema.affinidi.com/EventEligibilityV1-0.jsonld',
      },
    },
  })

  await issuanceClient.createOffer({
    issuanceId,
    credentialSubject,
    verification: { target: { email: holderEmail } },
  })

  res.status(200).end()
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
