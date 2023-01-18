import React from 'react';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import lang from '../lang/en.json';
import './NumericTrend.scss';

const locale = navigator.language;
export type NumericTrendProps = {
  primaryNumber: string;
  percentageNumber: string;
  timeText?: string;
  fontSize?: 'big' | 'small';
  showTrend?: boolean;
};

const NumericTrend: React.FunctionComponent<NumericTrendProps> = ({
  fontSize = 'big',
  percentageNumber,
  primaryNumber,
  timeText,
  showTrend = false,
}) => {
  const intl = useIntl();
  const sign = +percentageNumber > 0 ? '+' : percentageNumber?.charAt(0);
  const big = 'big';
  const small = 'small';

  if (fontSize !== big) {
    fontSize = small;
  }
  if (!timeText) {
    timeText = intl.formatMessage({
      id: 'no.data.to.show',
      defaultMessage: 'No data to show',
    });
  }

  const renderPercentageNumber = () => {
    if (percentageNumber === '0') {
      return (
        <div className="same-as">
          <FormattedMessage id="same.as" defaultMessage="Same as" />
        </div>
      );
    } else if (!percentageNumber) {
      return (
        <div className="gray">
          <div className="no-value" />%
        </div>
      );
    }

    return (
      <div className="arrow-percentage-container">
        <img
          data-testid={`arrow-${sign === '-' ? 'down' : 'up'}`}
          src={`/assets/arrow-${sign === '-' ? 'down' : 'up'}.svg`}
          className={`arrow ${fontSize}`}
          alt={`arrow ${sign === '-' ? 'down' : 'up'}`}
        />
        {sign}
        {Math.abs(+percentageNumber)}%
      </div>
    );
  };

  return (
    <div className="m-nt-container" data-testid="m-numeric-trend">
      <div className={`nt-big ${fontSize}`}>
        <div className={!primaryNumber ? 'no-value' : ''}>{primaryNumber}</div>
        {!primaryNumber && <div className="no-value" />}
      </div>
      {showTrend && (
        <div className={`nt-small ${fontSize}`}>
          {renderPercentageNumber()}
          <div className={`timeText${!primaryNumber ? ' gray' : ''}`}>
            {timeText}
          </div>
        </div>
      )}
    </div>
  );
};

const WrappedNumericTrend = (props) => {
  return (
    <IntlProvider locale={locale} messages={lang}>
      <NumericTrend {...props} />
    </IntlProvider>
  );
};

export default WrappedNumericTrend;
