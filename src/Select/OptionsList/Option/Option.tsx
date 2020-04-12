import React from 'react';
import { useTheme } from '../../../Themes';
import { IOptionProps } from '../../types';
import {createOptionCSS} from './styles';

export function Option(props: IOptionProps) {
    const { value, caption, onClick } = props;

    const theme = useTheme();

    const handleSelectItem = () => {
        onClick && onClick(value);
    };
    return (
        <div css={createOptionCSS(props, theme)} role="menuitem" tabIndex={0} onClick={handleSelectItem}>
            {caption}
        </div>
    );
}
