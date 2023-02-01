import { FC, useEffect } from "react";
import { W3CCredential } from "services/verifier/verifier.api";
import { useVerifyCredentialsMutation } from "hooks/verifier/useVerification";
import { useRetrieveSharedCredentialQuery } from "hooks/holder/useCredentials";
import { Result } from "./components/Result";
import { ROUTES } from "utils";

const VerifierResult: FC = () => {
  // TODO: state
  const location = {
    state: { hash: localStorage.getItem("_hash") || "", key: localStorage.getItem("_key") || "" },
  };

  const { data, isLoading, error } = useRetrieveSharedCredentialQuery(
    location.state.hash,
    location.state.key
  );

  const {
    data: verifyCredentialData,
    mutateAsync,
    isLoading: verifyCredentialIsLoading,
    error: verifyCredentialError,
  } = useVerifyCredentialsMutation();

  useEffect(() => {
    if (data) {
      mutateAsync(data as W3CCredential);
    }
  }, [data, mutateAsync]);

  return (
    <>
      <Result
        isLoading={isLoading || verifyCredentialIsLoading}
        error={error || verifyCredentialError}
        isValid={!!verifyCredentialData?.isValid}
        pathTo={ROUTES.verifier.scan}
      />
    </>
  );
};

export default VerifierResult;
