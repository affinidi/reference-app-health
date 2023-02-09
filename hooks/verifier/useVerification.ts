import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { hostUrl } from '../../pages/env'

type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}

type VerifyCredentialOutput = {
  isValid: boolean
  errors?: string[]
}

export const verifyCredentials = async (input: { hash: string; key: string }): Promise<VerifyCredentialOutput> => {
  const { data } = await axios<VerifyCredentialOutput>(
    `${hostUrl}/api/verifier/verify-vc`,
    { method: 'POST', data: input }
  )

  return data
}

export const useVerifyCredentialsMutation = () => {
  return useMutation<VerifyCredentialOutput | undefined, ErrorResponse, { hash: string; key: string }, () => void>(
    (input) => verifyCredentials(input),
  )
}
