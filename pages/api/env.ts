// backend-only envs

export const logLevel = process.env.LOG_LEVEL || 'info'

export const issuanceApiUrl = require(process.env.ISSUANCE_API_URL)
export const affinidiIamApiUrl = require(process.env.AFFINIDI_IAM_API_URL)
export const userManagementApiUrl = require(process.env.USER_MANAGEMENT_API_URL)
export const verifierApiUrl = require(process.env.VERIFIER_API_URL)
export const cloudWalletApiUrl = require(process.env.CLOUD_WALLET_API_URL)

export const apiKeyHash = require(process.env.API_KEY_HASH)

function require<T>(value: T | undefined): T {
  if (!value) {
    throw new Error('Environment value is missing')
  }

  return value
}

