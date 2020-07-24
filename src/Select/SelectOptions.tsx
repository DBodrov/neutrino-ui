import React from 'react';
import { Dropdown } from '../Dropdown';
import { useSelect } from './Select';

export function SelectOptions({ children }: any) {
  const { dropdownRef, isOpen, selectRect } = useSelect();
  return (
    <Dropdown isOpen={isOpen} parentBound={isOpen ? selectRect : undefined} ref={dropdownRef}>
      {children}
    </Dropdown>
  );
}
