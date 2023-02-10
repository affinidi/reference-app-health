import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { hostUrl } from 'pages/env'
import { ErrorResponse } from 'types/error'
import { useSessionStorage } from '../useSessionStorage'

export const useCheckCredentialsMutation = () => {
  return useMutation<void, ErrorResponse, { login: string; password: string }, () => void>(async (credentials) => {
    await axios<void>(
      `${hostUrl}/api/issuer/check-credentials`,
      { method: 'POST', headers: generateAuthHeaders(credentials) }
    )
  })
}

export const useSendVcOfferMutation = () => {
  const { getItem } = useSessionStorage()
  const login = getItem('issuerLogin')!
  const password = getItem('issuerPassword')!

  return useMutation<void, ErrorResponse, { targetEmail: string; credentialSubject: any }, () => void>(async (data) => {
    await axios<void>(
      `${hostUrl}/api/issuer/send-vc-offer`,
      { method: 'POST', data, headers: generateAuthHeaders({ login, password }) }
    )
  })
}

const generateAuthHeaders = (credentials: { login: string; password: string }) => {
  return {
    Authorization: `Basic ${credentials.login}:${credentials.password}`
  }
}
