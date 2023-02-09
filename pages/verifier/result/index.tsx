import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useVerifyCredentialsMutation } from 'hooks/verifier/useVerification'

import { Result } from '../../components/Result/Result'

const VerifierResult: FC = () => {
  const router = useRouter()
  const { key, hash } = router.query as { key: string; hash: string }

  const {
    data: verifyCredentialData,
    mutateAsync,
    isLoading: verifyCredentialIsLoading,
    error: verifyCredentialError,
  } = useVerifyCredentialsMutation();

  useEffect(() => {
    if (key && hash) {
      mutateAsync({ key, hash });
    }
  }, [key, hash, mutateAsync]);

  return (
    <Result
      isLoading={verifyCredentialIsLoading}
      error={verifyCredentialError}
      isValid={!!verifyCredentialData?.isValid}
      pathTo={ROUTES.verifier.scan}
    />
  );
};

export default VerifierResult;
