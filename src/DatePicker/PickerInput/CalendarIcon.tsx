import React from 'react';
import {colors} from '../../Themes';

export function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
    const { stroke=colors.pageElementsColors.border } = props;
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path
                    d="M2.46667 22.0015C1.65666 22.0015 1 21.3815 1 20.6168V5.38608C1 4.62138 1.65666 4.00146 2.46667 4.00146H21.5333C22.3433 4.00146 23 4.62138 23 5.38608V20.6168C23 21.3815 22.3433 22.0015 21.5333 22.0015H2.46667Z"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M0.75 10.0015H23"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7 6.00146V2.00146"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17 6.00146V2.00146"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.00146484)" />
                </clipPath>
            </defs>
        </svg>
    );
}
