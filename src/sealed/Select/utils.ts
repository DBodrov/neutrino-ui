import React from 'react';

export function useToggle() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => setIsOpen(true), []);

  const handleClose = React.useCallback(() => setIsOpen(false), []);

  const handleToggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return {
    isOpen, handleClose, handleOpen, handleToggle
  }
}
