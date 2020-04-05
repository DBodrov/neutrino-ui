import React from 'react';

export const MinusIcon = (props: React.SVGProps<any>) => {
    const {
        width = '16',
        height = '3',
        viewBox = '0 0 16 3',
        fill = 'none',
        stroke = 'white',
        strokeWidth = 2,
    } = props;

    return (
        <svg width={width} height={height} viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg">
            <line x1="0.989136" y1="1.5" x2="14.9891" y2="1.5" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
    );
};
