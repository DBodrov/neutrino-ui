import React from 'react';
import styled from '@emotion/styled';
import { TComponentItem } from '../../types';
import { Link, linkActiveStyle } from '../Link';
import { useDataContext } from '../../providers/DataProvider';

const List = styled.ul`
    display: flex;
    flex-flow: column nowrap;
    padding: 1rem 0;
    list-style: none;
`;

function ComponentItem({ link, name }: TComponentItem) {
    return (
        <li>
            <Link to={link} activeStyle={linkActiveStyle}>
                {name}
            </Link>
        </li>
    );
}
export function ComponentsList() {
    const components = useDataContext();
    return (
        <List>
            {components.map(component => (
                <ComponentItem key={component.name} {...component} />
            ))}
        </List>
    );
}
