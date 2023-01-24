import React from 'react';
import './HelpIcon.scss';
import classNames from 'classnames';
import { Tooltip } from 'primereact/tooltip';
import { generateHtmlId } from '../../utils/uuid';
export type HelpIconProps = {
  helpLinkTooltip: string;
  className?: string;
  helpTooltipPosition?: 'top' | 'left';
};

const HelpIcon: React.FunctionComponent<HelpIconProps> = ({
  helpLinkTooltip,
  className = '',
}) => {
  const elementId = generateHtmlId();
  return (
    <>
      <Tooltip
        position="top"
        target={`#${elementId}`}
        content={helpLinkTooltip}
      />
      <span
        id={elementId}
        className={classNames(`m-help-tooltip-icon`, className)}
        data-testid="m-help-tooltip-icon"
      >
        <img
          src="/assets/help-modal-q-mark-small.svg"
          className="icon-q-mark"
          alt=""
        />
      </span>
    </>
  );
};

export default HelpIcon;
