export interface IDropdownProps {
    isOpen: boolean;
    parentBound?: ClientRect | undefined;
    styles?: React.CSSProperties;
    children: React.ReactNode;
}
