import React from 'react';
import { IOptionsListProps, TOption } from '../types';
import { Option } from './Option';
import {StyledOptionsList, StyledNoData} from './styles';

export function OptionsList(props: IOptionsListProps) {
    const { options, onChangeHandler, selectedValue } = props;

    const isActiveOption = (value: keyof TOption) => String(value) === String(selectedValue);

    return (
        <StyledOptionsList>
            {options && options.length > 0 ? (
                options.map(option => {
                    const [key, value] = Object.entries(option)[0];
                    return (
                        <Option
                            key={key}
                            value={key}
                            caption={value}
                            onClick={onChangeHandler}
                            isActive={isActiveOption(key)}
                        />
                    );
                })
            ) : (
                <StyledNoData>Нет данных</StyledNoData>
            )}
        </StyledOptionsList>
    );
}
