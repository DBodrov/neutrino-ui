import React from 'react';

export function LeftIcon(props: React.SVGProps<SVGSVGElement>) {
  const {fill = 'currentColor', ...restProps} = props;

  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.015 0L0 5.013L6.015 10.025V0Z" fill={fill} />
    </svg>
  );
}
