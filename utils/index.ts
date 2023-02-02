import queryString from "query-string";
import UrlPattern from "url-pattern";

export type SharedVcParams = {
  vcURL: string | null;
  onboardingLink: string | null;
};

// eslint-disable-next-line import/prefer-default-export
export const pxToRem = (px: number) => `${px / 8}rem`;

export const getTitles = (titles: string[]) => {
  return titles && titles.join(", ");
};

export function getQueryParams(
  parameterLink: SharedVcParams
): { hash: string; key: string } | null {
  // let vcUrl: VcUrl
  if (parameterLink.vcURL) {
    const decodedUrl = window.atob(parameterLink.vcURL);
    const url = queryString.parse(decodedUrl).url?.toString();
    return extractHashAndKeyFromVSShareUrl(url!);
  }

  return null;
}

export const extractHashAndKeyFromVSShareUrl = (
  url: string
): { hash: string; key: string } | null => {
  const urlWithPathParam = url.split("?").shift();
  if (!urlWithPathParam) {
    return null;
  }

  const parser = new UrlPattern(
    "(http(s)\\://):subdomain.:environment.:domain.:tld(/api/v1/share/:hash)"
  );

  const key = url.split("?").pop()?.slice(4) || "";

  const hash = parser.match(urlWithPathParam).hash;
  return { hash, key };
};

export const JSON_SCHEMA_URL =
  "https://schema.affinidi.com/EventEligibilityV1-0.json";

export const ROUTES = {
  home: "/",
  verifier: {
    welcome: "/verifier/",
    scan: "/verifier/scan",
    result: "/verifier/result",
  },
  holder: {
    home: "/holder/",
  },
  issuer: {
    signIn: '/issuer/sign-in',
    confirmSignIn: '/issuer/confirm-sign-in',
    credentialForm: "/issuer/credential-form",
    result: '/issuer/result',
  },
};
