import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { hostUrl } from 'pages/env'
import { ErrorResponse, InputType, OutputType } from 'types/api'

type VerifyCredentialOutput = {
  isValid: boolean
  errors?: string[]
}

const verifyVc = async (input: { hash: string; key: string }): Promise<VerifyCredentialOutput> => {
  const { data } = await axios<VerifyCredentialOutput>(
    `${hostUrl}/api/verifier/verify-vc`,
    { method: 'POST', data: input }
  )

  return data
}

export const useVerifierApi = () => {
  return {
    useVerifierQuery: (input: InputType<typeof verifyVc>) => useQuery<OutputType<typeof verifyVc>, ErrorResponse>(
      ['verifyVc', input.hash, input.key],
      () => verifyVc(input)
    ),
  }
}
