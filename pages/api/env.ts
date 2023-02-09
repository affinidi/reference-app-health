// backend-only envs

export const logLevel = process.env.LOG_LEVEL || 'info'

export const issuanceApiUrl = require(process.env.ISSUANCE_API_URL)
export const verifierApiUrl = require(process.env.VERIFIER_API_URL)
export const cloudWalletApiUrl = require(process.env.CLOUD_WALLET_API_URL)

export const issuerLogin = require(process.env.ISSUER_LOGIN)
export const issuerPassword = require(process.env.ISSUER_PASSWORD)

export const issuerApiKeyHash = require(process.env.ISSUER_API_KEY_HASH)
export const issuerProjectDid = require(process.env.ISSUER_PROJECT_DID)
export const issuerProjectId = require(process.env.ISSUER_PROJECT_ID)

function require<T>(value: T | undefined): T {
  if (!value) {
    throw new Error('Environment value is missing')
  }

  return value
}

