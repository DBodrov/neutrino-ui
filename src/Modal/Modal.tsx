import React, { useEffect, useRef, useCallback } from 'react';
import { animated, useTransition } from 'react-spring';
import { Portal } from '../Portal';
import {useTheme} from '../Themes';
import { Span } from '../Typography';
import { Overlay, modalStyles, DissmissButton } from './styles';
import { CloseIcon } from './icons/CloseIcon';

export interface IModalProps {
    className?: string;
    isOpen: boolean;
    clickClose?: boolean;
    escClose?: boolean;
    styles?: React.CSSProperties;
    placement?: 'top' | 'center' | 'bottom';
    title?: string;
    showClose?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal(props: IModalProps) {
    const {
        isOpen,
        clickClose,
        escClose,
        onClose,
        title = '',
        showClose,
        children,
        placement = 'center',
    } = props;
    const modalRef = useRef<HTMLDivElement>(null);
    const transition = useTransition(isOpen, null, {
        from: { opacity: 0, transform: placement === 'bottom' ? 'translateY(200px)' : 'translateY(-200px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(200px)' },
    });

    const theme = useTheme();

    const handleClickOutside = useCallback(
        (event: Event) => {
            if (event.target instanceof HTMLElement && !modalRef.current.contains(event.target)) {
                onClose();
            }
        },
        [onClose]
    );

    const handleEscKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    const handleClose = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (clickClose && isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        if (escClose && isOpen) {
            document.addEventListener('keydown', handleEscKeyPress);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [clickClose, escClose, handleClickOutside, handleEscKeyPress, isOpen]);

    const renderModal = () =>
        transition.map(
            ({ item, props: springProps, key }) =>
                item && (
                    <Overlay key={key} css={{backgroundColor: theme.colors.pageElementsColors.overlay}}>
                        <animated.div
                            key={key}
                            css={modalStyles(props)}
                            style={{ ...springProps }}
                            ref={modalRef}>
                            {title && <Span css={{ fontWeight: 600, textAlign: 'center' }}>{title}</Span>}
                            {showClose && (
                                <DissmissButton type="button" tabIndex={-1} onClick={handleClose}>
                                    <CloseIcon />
                                </DissmissButton>
                            )}
                            <div css={{ overflow: 'hidden' }}>{children}</div>
                        </animated.div>
                    </Overlay>
                )
        );

    return <Portal>{renderModal()}</Portal>;
}
