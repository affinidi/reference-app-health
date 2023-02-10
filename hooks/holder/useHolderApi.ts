import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { hostUrl } from '../../pages/env'
import { VerifiableCredential } from '../../types/vc'
import { useSessionStorage } from '../useSessionStorage'

const signIn = async (input: { username: string }): Promise<{ token: string }> => {
  const { data: { token } } = await axios<{ token: string }>(
    `${hostUrl}/api/holder/sign-in`,
    { method: 'POST', data: input }
  )

  return { token }
}

const confirmSignIn = async (input: { token: string; confirmationCode: string }): Promise<{ accessToken: string }> => {
  const { data: { accessToken } } = await axios<{ accessToken: string }>(
    `${hostUrl}/api/holder/confirm-sign-in`,
    { method: 'POST', data: input }
  )

  return { accessToken }
}

const getVcs = async (accessToken: string): Promise<{ vcs: VerifiableCredential[] }> => {
  const { data: { vcs } } = await axios<{ vcs: VerifiableCredential[] }>(
    `${hostUrl}/api/holder/get-vcs`,
    { method: 'GET', headers: { 'Authorization': accessToken } }
  )

  return { vcs }
}

const claimVc = async (input: { credentialOfferRequestToken: string}, accessToken: string): Promise<{ credentialId: string }> => {
  const { data: { credentialId } } = await axios<{ credentialId: string }>(
    `${hostUrl}/api/holder/claim-vc`,
    {
      method: 'POST',
      data: {
        credentialOfferRequestToken: input.credentialOfferRequestToken,
      },
      headers: {
        'Authorization': accessToken,
      }
    }
  )

  return { credentialId }
}

const shareVc = async (input: { credentialId: string }, accessToken: string): Promise<{ vc: VerifiableCredential; qrCode: string }> => {
  const { data: { vc, qrCode } } = await axios<{ vc: VerifiableCredential; qrCode: string }>(
    `${hostUrl}/api/holder/share-vc`,
    {
      method: 'POST',
      data: {
        id: input.credentialId,
      },
      headers: {
        'Authorization': accessToken,
      }
    }
  )

  return { vc, qrCode }
}

type InputType<T extends (...args: any[]) => any> = Parameters<T>[0]
type OutputType<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>

export const useHolderApi = () => {
  const { getItem } = useSessionStorage()
  const accessToken = getItem('accessToken')!

  return {
    signInMutation: useMutation<OutputType<typeof signIn>, Error, InputType<typeof signIn>, () => void>((input) => signIn(input)),
    confirmSignInMutation: useMutation<OutputType<typeof confirmSignIn>, Error, InputType<typeof confirmSignIn>, () => void>((input) => confirmSignIn(input)),
    useGetVcsQuery: () => useQuery<OutputType<typeof getVcs>, Error>(['getVcs'], () => getVcs(accessToken)),
    useClaimVcQuery: (input: InputType<typeof claimVc>) => useQuery<OutputType<typeof claimVc>, Error>([], () => claimVc(input, accessToken)),
    useShareVcQuery: (input: InputType<typeof shareVc>) => useQuery<OutputType<typeof shareVc>, Error>([], () => shareVc(input, accessToken)),
  }
}

