export interface IDropdownProps {
    isOpen: boolean;
    parentBound?: DOMRect | undefined;
    styles?: React.CSSProperties;
    children: React.ReactNode;
}
