import React from 'react';
import {Aside} from './styles';
import { ComponentsList } from '../components';

export function Sidebar({isOpen}: any) {
    return (
        <Aside isOpen={isOpen}>
            <ComponentsList />
        </Aside>
    )
}
