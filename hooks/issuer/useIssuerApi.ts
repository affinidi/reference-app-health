import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { hostUrl } from 'pages/env'
import { ErrorResponse } from 'types/error'
import { useSessionStorage } from '../useSessionStorage'

const checkCredentials = async (credentials: { login: string; password: string }): Promise<void> => {
  await axios(
    `${hostUrl}/api/issuer/check-credentials`,
    { method: 'POST', headers: generateAuthHeaders(credentials) }
  )
}

const sendVcOffer = async (input: { targetEmail: string; credentialSubject: any }, credentials: { login: string; password: string }): Promise<void> => {
  await axios(
    `${hostUrl}/api/issuer/send-vc-offer`,
    {
      method: 'POST',
      data: input,
      headers: generateAuthHeaders(credentials)
    }
  )
}

const generateAuthHeaders = (credentials: { login: string; password: string }) => {
  return {
    Authorization: `Basic ${credentials.login}:${credentials.password}`
  }
}

type InputType<T extends (...args: any[]) => any> = Parameters<T>[0]
type OutputType<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>

export const useIssuerApi = () => {
  const { getItem } = useSessionStorage()
  const login = getItem('issuerLogin')!
  const password = getItem('issuerPassword')!

  return {
    checkCredentialsMutation: useMutation<OutputType<typeof checkCredentials>, ErrorResponse, InputType<typeof checkCredentials>, () => void>((input) => checkCredentials(input)),
    sendVcOfferMutation: useMutation<OutputType<typeof sendVcOffer>, ErrorResponse, InputType<typeof sendVcOffer>, () => void>((input) => sendVcOffer(input, { login, password })),
  }
}
