import { SVGAttributes } from "react";

export default (props: SVGAttributes<SVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.825 7 10 10.863 6.175 7 5 8.19l5 5.06 5-5.06L13.825 7z"
      fill="#373E97"
    />
  </svg>
);

