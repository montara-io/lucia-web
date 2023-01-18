import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { noSeverity } from '../../styles/colors';
import './CardColorIndicator.scss';
import HelpTooltip from '../HelpTooltip/HelpTooltip';
import InternalBtn, { InternalBtnProps } from '../InternalBtn/InternalBtn';

export type CardColorIndicatorProps = {
  id: string;
  color: string;
  internalLink?: InternalBtnProps;
  helpLinkOnClick?: () => void;
  helpLinkTooltip?: string | ReactNode;
  helpLinkTooltipPosition?: 'top' | 'left';
  children: any;
};

const CardColorIndicator: React.FunctionComponent<CardColorIndicatorProps> = (
  props
) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const MIN_CONTAINER_HEIGHT = 140;
  const MIN_BAR_HEIGHT = 60;
  const MAX_BAR_HEIGHT = 130;
  const BAR_GROW_RATIO =
    (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) / MIN_CONTAINER_HEIGHT;
  const [showTooltip, setShowTooltip] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (targetRef.current) {
        // @ts-ignore
        updateDom(targetRef.current.offsetHeight - MIN_CONTAINER_HEIGHT);
      }
    };
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    setTimeout(handleResize, 0);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buildSVG = (addHeight: number): string => {
    const MIN_TOP_BOTTOM_BAR_WALL_HEIGHT = 15;
    const MAX_TOP_BOTTOM_BAR_WALL_HEIGHT = 50;
    const BAR_WALL_GROW_RATIO =
      (MAX_TOP_BOTTOM_BAR_WALL_HEIGHT - MIN_TOP_BOTTOM_BAR_WALL_HEIGHT) /
      MIN_CONTAINER_HEIGHT;

    return `M 455 ${MIN_CONTAINER_HEIGHT + addHeight}
        H 20 
        a 20 20 90 0 1 -8 -2 
        a 20 20 90 0 1 -6 -4 
        a 20 20 90 0 1 -4 -6 
        a 20 20 90 0 1 -2 -8 
        v ${
          addHeight <= MIN_CONTAINER_HEIGHT
            ? -MIN_TOP_BOTTOM_BAR_WALL_HEIGHT - BAR_WALL_GROW_RATIO * addHeight
            : -addHeight + 90
        } 
        a 8 8 90 0 0 8 -8 
        V ${
          addHeight <= MIN_CONTAINER_HEIGHT
            ? 43 + BAR_WALL_GROW_RATIO * addHeight
            : 43 + BAR_WALL_GROW_RATIO * MIN_CONTAINER_HEIGHT
        } 
        a 8 8 90 0 0 -8 -8 
        V 20 
        a 20 20 90 0 1 2 -8 
        a 20 20 90 0 1 4 -6 
        a 20 20 90 0 1 6 -4 
        a 20 20 90 0 1 8 -2 
        h 2000 
        a 20 20 90 0 1 8 2 
        a 20 20 90 0 1 6 4 
        a 20 20 90 0 1 4 6 
        a 20 20 90 0 1 2 8 
        v ${100 + addHeight} 
        a 20 20 90 0 1 -2 8 
        a 20 20 90 0 1 -4 6 
        a 20 20 90 0 1 -6 4 
        a 20 20 90 0 1 -8 2 z`;
  };

  const updateDom = (heightOfChildren: number) => {
    const addHeight: number = heightOfChildren || 0;
    const ticket: HTMLElement = document.querySelector(`#${props.id} .ticket`)!;
    const ticketPath: HTMLElement = document.querySelector(
      `#${props.id} .ticketPath`
    )!;
    const bar: HTMLElement = document.querySelector(`#${props.id} .bar`)!;
    const barWrapper: HTMLElement = document.querySelector(
      `#${props.id} .bar-wrapper`
    )!;
    const barWrapperSvg: HTMLElement = document.querySelector(
      `#${props.id} .bar-wrapper svg`
    )!;

    ticketPath.setAttribute('d', buildSVG(addHeight));
    bar.setAttribute(
      'height',
      (addHeight <= MIN_CONTAINER_HEIGHT
        ? MIN_BAR_HEIGHT + addHeight * BAR_GROW_RATIO
        : MAX_BAR_HEIGHT) + ''
    );
    barWrapperSvg.setAttribute(
      'height',
      (addHeight <= MIN_CONTAINER_HEIGHT
        ? MIN_BAR_HEIGHT + addHeight * BAR_GROW_RATIO
        : MAX_BAR_HEIGHT) + ''
    );
    ticket.style['min-height'] = MIN_CONTAINER_HEIGHT + addHeight + 'px';
    bar.style['display'] = 'block';

    const MIN_BAR_TOP_POSITION = 40;
    const MAX_BAR_TOP_POSITION = 75;
    const BAR_TOP_POSITION_RATIO =
      (MAX_BAR_TOP_POSITION - MIN_BAR_TOP_POSITION) / MIN_CONTAINER_HEIGHT;
    barWrapper.style['top'] =
      (addHeight <= MIN_CONTAINER_HEIGHT
        ? MIN_BAR_TOP_POSITION + BAR_TOP_POSITION_RATIO * addHeight
        : MAX_BAR_TOP_POSITION) + 'px';
  };

  return (
    <div className="m-card-color-indicator" id={props.id}>
      {showTooltip && (
        <HelpTooltip helpTooltipPosition={props.helpLinkTooltipPosition}>
          {props.helpLinkTooltip}
        </HelpTooltip>
      )}
      <div className="bar-wrapper">
        <svg className="bar-wrapper-svg">
          <g>
            <rect
              className="bar"
              height="16"
              width="6"
              fill={props.color || noSeverity}
              rx="3"
            />
          </g>
        </svg>
      </div>

      <div className="ticket-wrapper">
        {/* eslint-disable-next-line react/prop-types */}
        <div
          className="ticket"
          style={{ clipPath: `url('#${props.id}-profile-clip-path')` }}
        >
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
                alt=""
              />
            </div>
          )}
          <div className="children-container" ref={targetRef}>
            {props.children}
          </div>
          {props.internalLink && (
            <InternalBtn {...props.internalLink} id={props.id} />
          )}
        </div>
      </div>

      <div className="clip-path-wrapper">
        <svg width="0" height="0">
          <clipPath
            id={`${props.id}-profile-clip-path`}
            clipPathUnits="userSpaceOnUse"
          >
            <path className="ticketPath" />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};

export default CardColorIndicator;
