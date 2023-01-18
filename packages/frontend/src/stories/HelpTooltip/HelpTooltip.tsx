import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import './HelpTooltip.scss'

export interface HelpTooltipProps {
  style?: CSSProperties
  className?: string
  helpTooltipPosition?: 'top' | 'left' | undefined
  children?: any
}

const HelpTooltip: React.FunctionComponent<HelpTooltipProps> = ({
  children,
  style,
  className,
  helpTooltipPosition = 'top',
}) => {
  return (
    <div
      className={classNames(
        'm-help-tooltip',
        className,
        helpTooltipPosition === 'left' ? 'left' : '',
      )}
      data-testid="m-help-tooltip"
      {...(style ? { style } : {})}
    >
      <div className="m-help-tooltip-inner">{children}</div>
    </div>
  )
}

export default HelpTooltip
