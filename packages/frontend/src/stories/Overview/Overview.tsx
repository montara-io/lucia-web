import React from 'react';
import './Overview.scss';
import classNames from 'classnames';
import { Tooltip } from 'primereact/tooltip';
import { TooltipPositionType } from 'primereact/tooltip/tooltipoptions';
import { primary } from '../../styles/colors';
import { NO_DATA_MESSAGE } from '../utils/consts';

export interface OverviewItem {
  imgUrl?: string;
  title: string;
  score?: string | number;
  exploreOnClick?: () => void;
  tooltip?: string;
  tooltipPosition?: TooltipPositionType;
}

export type OverviewProps = {
  items?: OverviewItem[];
};

const Overview: React.FunctionComponent<OverviewProps> = ({ items = [] }) => {
  return (
    <div className="overview-container">
      {items?.map((item, index) => {
        return (
          <div
            key={`${item?.title}-overview`}
            data-testid="overview-item"
            className={classNames(
              'overview-item',
              index === items?.length - 1 ? 'no-border' : 'item-border',
            )}
          >
            <div
              data-testid="overview-item-data"
              className={classNames('overview-item-data', 'no-severity')}
              style={{ color: primary }}
            >
              <img
                src={item?.imgUrl ?? '/assets/menu-icons/Engagement.svg'}
                className={classNames('overview-item-icon')}
                alt="overview-item-icon"
                data-testid="overview-item-icon"
              />
              <div
                data-testid="overview-item-title"
                className="overview-item-title"
              >
                {item?.title}
              </div>
              {item?.score ? (
                <>
                  <div
                    data-testid="overview-item-score"
                    className="overview-item-score"
                  >
                    {item?.score}
                  </div>
                  {item?.exploreOnClick && (
                    <span
                      onClick={() =>
                        item && item.exploreOnClick && item?.exploreOnClick()
                      }
                      data-testid="overview-item-explore"
                      className="overview-item-explore"
                    >
                      {'Explore'}
                    </span>
                  )}
                </>
              ) : (
                <>
                  {item?.tooltip && (
                    <Tooltip
                      content={item?.tooltip}
                      target={`.no-data-${index}`}
                      position={item?.tooltipPosition ?? 'top'}
                    />
                  )}
                  <div
                    data-testid="no-score"
                    className={classNames('no-data', `no-data-${index}`)}
                    style={{ color: primary }}
                  >
                    {NO_DATA_MESSAGE}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const WrappedOverview = (props) => {
  return <Overview {...props} />;
};
export default WrappedOverview;
