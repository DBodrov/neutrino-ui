import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Input } from '../Input';

const mockHandleChange = jest.fn();
const mockHandleFocus = jest.fn();
const mockHandleBlur = jest.fn();

const setup = () => {
    const utils = render(
        <Input
            name="text"
            onChangeHandler={mockHandleChange}
            onFocusHandler={mockHandleFocus}
            onBlurHandler={mockHandleBlur}
            data-testid="text-input"
        />
    );

    const input = utils.getByTestId('text-input');
    return {
        ...utils,
        input
    }
};

describe('*** Input ***', () => {
    test('should Input render', () => {
        const {input} = setup();
        expect(input).toBeInTheDocument();
    })
    test('call onChange handler', () => {
        const {input} = setup();
        fireEvent.change(input, {target: {value: '123'}});
        expect(mockHandleChange).toBeCalledTimes(1);
    })
    test('call onFocus handler', () => {
        const {input} = setup();
        userEvent.click(input);
        expect(input).toHaveFocus();
        expect(mockHandleFocus).toBeCalledTimes(1);
        userEvent.click(document.body);
        expect(input).not.toHaveFocus();
        expect(mockHandleBlur).toBeCalledTimes(1);

    })
})
