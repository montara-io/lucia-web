import React from 'react';
import './ActionButton.scss';
import { Button, ButtonPositionType } from 'primereact/button';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';

export type ActionButtonProps = {
  id: string;
  label?: string;
  disabled?: boolean;
  icon?: any;
  iconPos?: ButtonPositionType;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  onClick?: (e: any) => void;
  onMouseEnter?: (e) => void;
  children?: any;
};

const ActionButton: React.FunctionComponent<ActionButtonProps> = ({
  children,
  id,
  label,
  disabled,
  icon,
  iconPos,
  tooltip,
  tooltipOptions,
  onClick,
  onMouseEnter,
}) => {
  return (
    <Button
      id={id}
      label={label}
      disabled={disabled}
      className={'action-button primary-button primary'}
      data-testid="action-button"
      icon={icon}
      iconPos={iconPos}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
      onClick={(e) => {
        e.persist(); // persist prevent "Warning: This synthetic event is reused for performance reasons" error
        onClick && onClick(e);
      }}
      onMouseEnter={(e) => {
        e.persist(); // persist prevent "Warning: This synthetic event is reused for performance reasons" error
        onMouseEnter && onMouseEnter(e);
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {children}
    </Button>
  );
};

export default ActionButton;
