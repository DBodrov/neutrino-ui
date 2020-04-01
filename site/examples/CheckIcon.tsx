import React from 'react';

export const CheckIcon = (props: React.SVGProps<any>) => {
    const { width = "16", height = "11", viewBox = "0 0 16 11", fill="none", stroke = "white", strokeWidth = 2, strokeLinecap = "round", strokeLinejoin = "round" } = props;

    return (
        <svg width={width} height={height} viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 1L5.45455 9.99008L1 5.49504"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
            />
        </svg>
    );
};
