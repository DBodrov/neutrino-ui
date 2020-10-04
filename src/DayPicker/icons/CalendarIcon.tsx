import React from 'react';

export function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  const {stroke = '#7D828B', ...restProps} = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clip-path="url(#clip0)">
        <path
          d="M2.46667 22.001C1.65666 22.001 1 21.3811 1 20.6164V5.38559C1 4.6209 1.65666 4.00098 2.46667 4.00098H21.5333C22.3433 4.00098 23 4.6209 23 5.38559V20.6164C23 21.3811 22.3433 22.001 21.5333 22.001H2.46667Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.75 10.001H23"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 6.00098V2.00098"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 6.00098V2.00098"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white" transform="translate(0 0.000976562)" />
        </clipPath>
      </defs>
    </svg>
  );
}
