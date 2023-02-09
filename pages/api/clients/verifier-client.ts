// TODO: replace with client-sdk

import axios from 'axios'
import { VerifiableCredential } from '../../../types/vc'
import { issuerApiKeyHash, verifierApiUrl } from '../env'

type VerifyCredentialOutput = {
  errors: string[]
  isValid: boolean
}

export const verifierClient = {
  verifyCredentials: async (input: { verifiableCredentials: VerifiableCredential[] }): Promise<VerifyCredentialOutput> => {
    const { data } = await axios<VerifyCredentialOutput>(
      `${verifierApiUrl}/v1/verifier/verify-vcs`,
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
}
