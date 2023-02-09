// TODO: replace with client-sdk

import axios from 'axios'
import { issuerApiKeyHash, issuanceApiUrl } from '../env'

type CreateIssuanceInput = {
  template: {
    walletUrl?: string
    verification: {
      method: 'email'
    }
    schema: {
      jsonLdContextUrl: string
      jsonSchemaUrl: string
      type: string
    }
    issuerDid: string
  }
  projectId: string
}

type CreateIssuanceOfferInput = {
  verification: {
    target: {
      email: string
    }
  }
  credentialSubject: any
}

export const issuanceClient = {
  createIssuance: async (input: CreateIssuanceInput): Promise<{ id: string }> => {
    const { data } = await axios<{ id: string }>(
      `${issuanceApiUrl}/v1/issuances`,
      {
        method: 'POST',
        headers: {
          'Api-Key': issuerApiKeyHash,
        },
        data: input,
      }
    )

    return data
  },
  createOffer: async ({ issuanceId, ...input }: CreateIssuanceOfferInput & { issuanceId: string }): Promise<void> => {
    await axios<void>(
      `${issuanceApiUrl}/v1/issuances/${issuanceId}/offers`,
      {
        method: 'POST',
        headers: {
          'Api-Key': issuerApiKeyHash,
        },
        data: input,
      }
    )
  },
}
