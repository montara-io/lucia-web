export type IconsType = 'arrow-left';

export const Icon = (props: { iconName: IconsType }) => {
  return <span className={`pi pi-${props.iconName}`} />;
};
