export interface IDropdownProps {
    isOpen: boolean;
    parentBound?: DOMRect | undefined;
    parentNode?: React.MutableRefObject<HTMLDivElement>
    styles?: React.CSSProperties;
    children: React.ReactNode;
}
