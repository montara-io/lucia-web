import NumericTrend from './NumericTrend';
import * as React from 'react';

export default {
  title: 'Components/NumericTrend',
  component: NumericTrend,
};

export const BasicNegative = (args) => <NumericTrend {...args} />;
BasicNegative.args = {
  id: 'id',
  primaryNumber: '73',
  percentageNumber: '-2',
  timeText: 'Past 6 months',
  fontSize: 'small',
};

BasicNegative.parameters = {
  jest: ['NumericTrend.test.tsx'],
};

export const BasicPositive = (args) => <NumericTrend {...args} />;
BasicPositive.args = {
  id: 'id',
  primaryNumber: '73',
  percentageNumber: '31',
  timeText: 'Past 6 months',
  fontSize: 'small',
  showTrend: true,
};
BasicPositive.parameters = {
  jest: ['NumericTrend.test.tsx'],
};

export const NoData = (args) => <NumericTrend {...args} />;
NoData.args = {
  id: 'id',
  primaryNumber: '',
  percentageNumber: '',
  timeText: null,
  fontSize: 'small',
};

export const Zero = (args) => <NumericTrend {...args} />;
Zero.args = {
  id: 'id',
  primaryNumber: '80',
  percentageNumber: '0',
  timeText: null,
  fontSize: 'small',
};
