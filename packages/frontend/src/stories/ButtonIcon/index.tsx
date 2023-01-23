import { Icon, IconsType } from '../Icon';

type ButtonIconProps = {
  iconName: IconsType;
  onClick: () => void;
};
export const ButtonIcon = (props: ButtonIconProps) => {
  return (
    <span style={{ cursor: 'pointer' }} onClick={props.onClick}>
      <Icon iconName={props.iconName} />
    </span>
  );
};
