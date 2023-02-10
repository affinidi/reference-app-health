import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { hostUrl } from 'pages/env'
import { ErrorResponse } from 'types/error'
import { VerifiableCredential } from 'types/vc'
import { useSessionStorage } from 'hooks/useSessionStorage'

export const useSignInMutation = () => {
  return useMutation<{ token: string }, ErrorResponse, { username: string }, () => void>(async (data) => {
    const { data: { token } } = await axios<{ token: string }>(
      `${hostUrl}/api/holder/sign-in`,
      { method: 'POST', data }
    )
  
    return { token }
  })
}

export const useConfirmSignInMutation = () => {
  return useMutation<{ accessToken: string }, ErrorResponse, { token: string; confirmationCode: string }, () => void>(async (data) => {
    const { data: { accessToken } } = await axios<{ accessToken: string }>(
      `${hostUrl}/api/holder/confirm-sign-in`,
      { method: 'POST', data }
    )
  
    return { accessToken }
  })
}

export const useLogOutMutation = () => {
  const { getItem } = useSessionStorage()
  
  return useMutation<void, ErrorResponse, void, () => void>(async () => {
    const accessToken = getItem('accessToken')
    if (!accessToken) return

    await axios<void>(
      `${hostUrl}/api/holder/log-out`,
      { method: 'POST', headers: { 'Authorization': accessToken } }
    )
  })
}


export const useCheckHolderAuthMutation = () => {
  const { getItem } = useSessionStorage()
  
  return useMutation<void, ErrorResponse, void, () => void>(async () => {
    const accessToken = getItem('accessToken')
    if (!accessToken) throw new Error('Access token is not present')
    
    await axios<{ did: string }>(
      `${hostUrl}/api/holder/get-did`,
      { method: 'POST', headers: { 'Authorization': accessToken } }
    )
  })
}

export const useGetVcsQuery = () => {
  const { getItem } = useSessionStorage()
  
  return useQuery<{ vcs: VerifiableCredential[] }, ErrorResponse>(['getVcs'], async () => {
    const accessToken = getItem('accessToken')
    if (!accessToken) throw new Error('Access token is not present')

    const { data: { vcs } } = await axios<{ vcs: VerifiableCredential[] }>(
      `${hostUrl}/api/holder/get-vcs`,
      { method: 'GET', headers: { 'Authorization': accessToken } }
    )
  
    return { vcs }
  })
}

export const useClaimVcQuery = (data: { credentialOfferRequestToken: string }) => {
  const { getItem } = useSessionStorage()
  
  return useQuery<{ credentialId: string }, ErrorResponse>(['claimVc', data.credentialOfferRequestToken], async () => {
    const accessToken = getItem('accessToken')
    if (!accessToken) throw new Error('Access token is not present')

    const { data: { credentialId } } = await axios<{ credentialId: string }>(
      `${hostUrl}/api/holder/claim-vc`,
      {
        method: 'POST',
        data,
        headers: {
          'Authorization': accessToken,
        }
      }
    )
  
    return { credentialId }
  }, { enabled: Boolean(data.credentialOfferRequestToken) })
}

export const useShareVcQuery = (data: { credentialId: string }) => {
  const { getItem } = useSessionStorage()
  
  return useQuery<{ vc: VerifiableCredential; qrCode: string }, ErrorResponse>(['shareVc', data.credentialId], async () => {
    const accessToken = getItem('accessToken')
    if (!accessToken) throw new Error('Access token is not present')

    const { data: { vc, qrCode } } = await axios<{ vc: VerifiableCredential; qrCode: string }>(
      `${hostUrl}/api/holder/share-vc`,
      {
        method: 'POST',
        data,
        headers: {
          'Authorization': accessToken,
        }
      }
    )
  
    return { vc, qrCode }
  }, { enabled: Boolean(data.credentialId) })
}
