export interface IDropdownProps {
  isOpen: boolean;
  parentBound?: DOMRect | IParentBound;
  parentNode?: React.MutableRefObject<HTMLDivElement>;
  styles?: React.CSSProperties;
  children: React.ReactNode;
}

export interface IParentBound {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}
