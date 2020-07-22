import React, { forwardRef } from 'react';
import { animated, useTransition } from 'react-spring';
import { useTheme } from '../Themes';
import { Portal } from '../Portal';
import { DropdownSpringStyles, createDropdownCSS } from './styles';
import { IDropdownProps } from './types';

const Dropdown = forwardRef((props: IDropdownProps, ref: React.RefObject<HTMLDivElement>) => {
    const { isOpen, parentBound, children, styles = {} } = props;
    const theme = useTheme();

    const onUpdate = () => {
        if (isOpen) {
            return new DropdownSpringStyles(ref, parentBound).createSpringStyles();
        }
        return {};
    };

    const transitions = useTransition(isOpen, null, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        update: onUpdate(),
        leave: { opacity: 0, transform: 'translateY(20px)' },
        config: { duration: 200, tension: 200 },
    });

    const renderDropdown = () =>
        transitions.map(
            ({ item, props: springProps, key }) =>
                item && (
                    <animated.div
                        key={key}
                        css={createDropdownCSS(props, theme)}
                        ref={ref}
                        style={{ ...springProps, ...styles }}
                        tabIndex={-1}>
                        {children}
                    </animated.div>
                )
        );

    return <Portal>{renderDropdown()}</Portal>;
});

Dropdown.displayName = 'Dropdown';
export {Dropdown};
