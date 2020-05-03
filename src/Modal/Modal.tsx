import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { animated, useTransition } from 'react-spring';
import {Portal} from '../Portal';
import {Overlay} from './styles';
// import cn from 'classnames/bind';
// import { UI } from 'services';
// import closeIco from 'ui-kit/assets/icons/forms/close.svg';
import css from './BasicModal.module.scss';

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

// const cx = cn.bind(css);

export function Modal(props: IModalProps) {
    const {
        className,
        isOpen,
        clickClose,
        escClose,
        onClose,
        styles,
        title = '',
        showClose,
        children,
        placement = 'center',
    } = props;
    const modalRef = useRef<HTMLDivElement>(null);
    // const rootNode = UI.createModalRootNode();
    const transition = useTransition(isOpen, null, {
        from: { opacity: 0, transform: placement === 'bottom' ? 'translateY(200px)' : 'translateY(-200px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(200px)' },
    });

    // const modalClasses = cx(
    //     css.Modal,
    //     { [css.withTitle]: Boolean(title) },
    //     { [css.onTop]: placement === 'top' },
    //     { [css.onCenter]: placement === 'center' },
    //     { [css.onBottom]: placement === 'bottom' },
    //     className
    // );

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
                    <Overlay>
                        <animated.div
                            key={key}
                            // className={modalClasses}
                            style={{ ...springProps, ...styles }}
                            ref={modalRef}>
                            {title && (
                                <div className={css.Title}>
                                    <span>{title}</span>
                                </div>
                            )}
                            {showClose && (
                                <button
                                    className={css.Close}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={handleClose}>
                                    {/* <img src={closeIco} alt="X" /> */}
                                </button>
                            )}
                            <div className={css.ModalContent}>{children}</div>
                        </animated.div>
                    </Overlay>
                )
        );

    return (
        <Portal>
            {renderModal()}
        </Portal>
    )
}
