import React, { CSSProperties } from 'react'
import './Tooltip.scss'

export interface TooltipProps {
  position?: 'top' | 'right'
  style?: CSSProperties
  children: any
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  children,
  position = 'top',
  style,
}) => {
  return (
    <div
      className={`m-tooltip on ${position}`}
      data-testid="m-tooltip"
      {...(style ? { style } : {})}
    >
      <div className="m-tooltip-arrow" />
      <div className="m-tooltip-inner">{children}</div>
    </div>
  )
}

export default Tooltip
