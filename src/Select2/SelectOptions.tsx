import React from 'react';
import { Dropdown } from '../Dropdown';
import {useSelect} from './Select';

export function SelectOptions({children}: any) {
  const {ddRef, isOpen, selectRect} = useSelect();
  return (
    <Dropdown isOpen={isOpen} parentBound={isOpen ? (selectRect as ClientRect) : undefined} ref={ddRef}>
    {children}
  </Dropdown>
  )
}
