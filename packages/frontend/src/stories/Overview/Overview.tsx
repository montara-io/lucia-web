import React from 'react';
import './Overview.scss';
import classNames from 'classnames';
import { primary } from '../../styles/colors';
import HelpIcon from '../HelpIcon/HelpIcon';

export interface OverviewItem {
  imgUrl?: string;
  title: string;
  score?: string | number;
  tooltip?: string;
}

export type OverviewProps = {
  items?: OverviewItem[];
};

const Overview: React.FunctionComponent<OverviewProps> = ({ items = [] }) => {
  return (
    <div
      className="overview-container"
      style={{ height: `${(Math.max(items.length, 4) / 4) * 7}rem` }}
    >
      {items?.map((item, index) => {
        return (
          <div
            key={`${item?.title}-overview`}
            data-testid="overview-item"
            className={classNames('overview-item')}
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
                {item?.title}{' '}
                {!!item?.tooltip && (
                  <HelpIcon helpLinkTooltip={item?.tooltip} />
                )}
              </div>
              <div
                data-testid="overview-item-score"
                className="overview-item-score"
              >
                {item?.score}
              </div>
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
