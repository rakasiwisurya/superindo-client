export interface IModalCommonProps {
  isOpen: boolean;
  onCancel: () => void;
}

export interface IModalEditCommonProps extends IModalCommonProps {
  id?: number | string | null;
}
