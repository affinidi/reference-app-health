import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { parse } from 'set-cookie-parser'
import { apiKeyHash, userManagementApiUrl } from '../env'

function extractConsoleAuthTokenFromResponse(response: AxiosResponse): string {
  const setCookie = response.headers['set-cookie']
  if (!setCookie) {
    throw new Error('"set-cookie" is not present in response headers')
  }

  const cookie = parse(setCookie, { map: true })
  const consoleAuthToken = cookie.console_authtoken?.value
  if (!consoleAuthToken) {
    throw new Error('"console_authtoken" is not present in "set-cookie" header')
  }

  return consoleAuthToken
}

export const userManagementClient = {
  async login(input: { username: string }): Promise<{ token: string }> {
    const { data: token } = await axios<string>(
      `${userManagementApiUrl}/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { token }
  },
  async confirmLogin(input: { token: string, confirmationCode: string }): Promise<{ consoleAuthToken: string }> {
    const response = await axios<void>(
      `${userManagementApiUrl}/v1/auth/login/confirm`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { consoleAuthToken: extractConsoleAuthTokenFromResponse(response) }
  },
  async signup(input: { username: string }): Promise<{ token: string }> {
    const { data: token } = await axios<string>(
      `${userManagementApiUrl}/v1/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { token }
  },
  async confirmSignup(input: { token: string, confirmationCode: string }): Promise<{ consoleAuthToken: string }> {
    const response = await axios<void>(
      `${userManagementApiUrl}/v1/auth/signup/confirm`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { consoleAuthToken: extractConsoleAuthTokenFromResponse(response) }
  },
}