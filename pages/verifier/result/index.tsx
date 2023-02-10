import { FC } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'utils'
import { useVerifyVcQuery } from 'hooks/verifier/api'
import { Result } from '../../components/Result/Result'

const VerifierResult: FC = () => {
  const router = useRouter()
  const { key, hash } = router.query as { key: string; hash: string }

  const { data, isLoading, error } = useVerifyVcQuery({ key, hash })

  return (
    <Result
      isLoading={isLoading}
      error={error}
      isValid={Boolean(data?.isValid)}
      pathTo={ROUTES.verifier.scan}
    />
  );
};

export default VerifierResult;
