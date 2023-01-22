import React from 'react';
import './Overview.scss';
import classNames from 'classnames';
import { Tooltip } from 'primereact/tooltip';
import { TooltipPositionType } from 'primereact/tooltip/tooltipoptions';
import { getSeverityByValue } from '../utils';
import { SEVERITY_COLOR } from '../utils/enums';
import { gray200, primary, secondary } from '../../styles/colors';
import { NO_DATA_MESSAGE } from '../utils/consts';

export interface OverviewItem {
  imgUrl?: string;
  title: string;
  score?: number;
  isSoon?: boolean;
  exploreOnClick?: () => void;
  tooltip?: string;
  tooltipPosition?: TooltipPositionType;
}

export type OverviewProps = {
  data?: OverviewItem[];
  disabledIconClassName?: string;
};

const locale = navigator.language;

const Overview: React.FunctionComponent<OverviewProps> = ({
  data = [],
  disabledIconClassName = '',
}) => {
  return (
    <div className="overview-container">
      {data?.map((item, index) => {
        return (
          <div
            key={`${item?.title}-overview`}
            data-testid="overview-item"
            className={classNames(
              'overview-item',
              index === data?.length - 1 ? 'no-border' : 'item-border',
            )}
          >
            <div
              data-testid="overview-item-data"
              className={classNames(
                'overview-item-data',
                getSeverityByValue(item?.score) === SEVERITY_COLOR?.NO_SEVERITY
                  ? 'no-severity'
                  : '',
                getSeverityByValue(item?.score) === SEVERITY_COLOR?.MID_SEVERITY
                  ? 'mid-severity'
                  : '',
                getSeverityByValue(item?.score) ===
                  SEVERITY_COLOR?.HIGH_SEVERITY
                  ? 'high-severity'
                  : '',
                getSeverityByValue(item?.score) === SEVERITY_COLOR?.NONE
                  ? 'none-severity'
                  : '',
              )}
              style={{ color: item?.isSoon ? gray200 : primary }}
            >
              <img
                src={item?.imgUrl ?? '/assets/menu-icons/Engagement.svg'}
                className={classNames(
                  'overview-item-icon',
                  item?.isSoon ? disabledIconClassName : '',
                )}
                alt="overview-item-icon"
                data-testid="overview-item-icon"
              />
              <div
                data-testid="overview-item-title"
                className="overview-item-title"
              >
                {item?.title}
              </div>
              {!item?.isSoon && item?.score ? (
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
                    style={{ color: item?.isSoon ? secondary : primary }}
                  >
                    {item?.isSoon ? 'Soon...' : NO_DATA_MESSAGE}
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
