import React, {forwardRef} from 'react';
import {animated, useTransition} from 'react-spring';
import {useTheme} from '../Themes';
import {Portal} from '../Portal';
import {DropdownSpringStyles, createDropdownCSS} from './styles';
import {IDropdownProps, IParentBound} from './types';

const Dropdown = forwardRef((props: IDropdownProps, ref: React.RefObject<HTMLDivElement>) => {
  const {isOpen, parentBound, parentNode, children, styles = {}} = props;
  const dropdownProps = props;
  const theme = useTheme();

  const onUpdate = () => {
    if (isOpen) {
      let parentRect: IParentBound = {top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0};
      if (!parentBound && parentNode) {
        const rect = parentNode.current.getBoundingClientRect();
        parentRect = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
        };
      }
      if (parentBound) {
        parentRect = {
          top: parentBound.top,
          bottom: parentBound.bottom,
          left: parentBound.left,
          right: parentBound.right,
          width: parentBound.width,
          height: parentBound.height,
        };
      } else {
        parentRect = {...parentBound};
      }

      return new DropdownSpringStyles(ref, parentRect).createSpringStyles();
    }
    return {};
  };

  const transitions = useTransition(isOpen, {
    from: {opacity: 0, transform: 'translateY(20px)'},
    update: onUpdate(),
    leave: {opacity: 0, transform: 'translateY(20px)'},
    config: {duration: 200, tension: 200},
  });

  const renderDropdown = () =>
    transitions(
      (props, item, key) =>
        item && (
          <animated.div
            css={createDropdownCSS(dropdownProps, theme)}
            ref={ref}
            style={{...props, ...styles}}
            tabIndex={-1}
          >
            {children}
          </animated.div>
        ),
    );

  return <Portal>{renderDropdown()}</Portal>;
});

Dropdown.displayName = 'Dropdown';
export {Dropdown};
