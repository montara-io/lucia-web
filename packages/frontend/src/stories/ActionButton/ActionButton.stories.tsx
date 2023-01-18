import ActionButton from './ActionButton';
import * as React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Button',
  component: ActionButton,
};

export const actionButton = (args) => (
  <div style={{ width: '110px', fontSize: '10px', height: 21 }}>
    <ActionButton {...args} onClick={action('Clicked')} onMouseEnter={action('Mouse Enter')} />
  </div>
);

actionButton.args = {
  id: 'buttonId',
  label: 'LOGIN',
  disabled: false,
  onClick: null,
  onMouseEnter: null,
  type: 'button',
};

actionButton.parameters = {
  jest: ['ActionButton.test.tsx'],
};
