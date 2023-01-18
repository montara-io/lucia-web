import React, { ReactNode, useState } from 'react'
import HelpTooltip from '../HelpTooltip/HelpTooltip'
import InternalBtn, { InternalBtnProps } from '../InternalBtn/InternalBtn'
import './Card.scss'

export type CardProps = {
  internalLink?: InternalBtnProps
  helpLinkOnClick?: () => void
  helpLinkTooltip?: string | ReactNode
  helpLinkTooltipId?: string
  helpLinkTooltipPosition?: 'top' | 'left'
  children?: any
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="m-card">
      {showTooltip && (
        <HelpTooltip helpTooltipPosition={props.helpLinkTooltipPosition}>
          {props.helpLinkTooltip}
        </HelpTooltip>
      )}
      {props.helpLinkTooltip && (
        <div
          className={`m-help-tooltip-icon${
            props.helpLinkOnClick ? ' clickable' : ''
          }`}
          data-testid="m-help-tooltip-icon"
          {...(props.helpLinkOnClick && { onClick: props.helpLinkOnClick })}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <img
            src="/assets/help-modal-q-mark-small.svg"
            className="icon-q-mark"
            {...(props.helpLinkTooltipId
              ? { id: props.helpLinkTooltipId }
              : {})}
            alt=""
          />
        </div>
      )}
      <div className="children-container">{props.children}</div>
      {props.internalLink && <InternalBtn {...props.internalLink} />}
    </div>
  )
}

export default Card
