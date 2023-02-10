import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { hostUrl } from 'pages/env'
import { ErrorResponse } from 'types/error'

type VerifyCredentialOutput = {
  isValid: boolean
  errors?: string[]
}

export const useVerifyVcQuery = (input: { hash: string; key: string }) => {
  return useQuery<VerifyCredentialOutput, ErrorResponse>(['verifyVc'], async () => {
    const { data: { isValid, errors } } = await axios<VerifyCredentialOutput>(
      `${hostUrl}/api/verifier/verify-vc`,
      { method: 'POST' }
    )
  
    return { isValid, errors }
  }, { enabled: Boolean(input.hash && input.key) })
}
