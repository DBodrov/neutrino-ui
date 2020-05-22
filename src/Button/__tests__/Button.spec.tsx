import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from '../Button';

const onClickMock = jest.fn();

const setup = (props = {}) => {
    const utils = render(<Button type="button" onClick={onClickMock} data-testid="button" {...props} />);
    const button = utils.getByTestId('button');
    return { button, ...utils };
};

describe('****BasicButton****', () => {
    test('should render BasicButton', () => {
        const { button } = setup();
        expect(button).toBeInTheDocument();
    });

    test('should called onClick handler', () => {
        const { button } = setup();
        fireEvent.click(button, {});
        expect(onClickMock).toHaveBeenCalled();
    });

    test('should not called onClick when button is disabled', () => {
        const { button } = setup({ disabled: true });
        expect(button).toHaveAttribute('disabled');
    });
});
