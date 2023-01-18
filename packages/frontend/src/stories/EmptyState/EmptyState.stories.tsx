import React from 'react';
import EmptyState from './EmptyState';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  argTypes: {
    data: { control: 'object' },
    isStatic: { control: 'boolean' },
    onClickNode: { control: { type: null } },
  },
};

export const Basic = () => (
  <div>
    <EmptyState />
  </div>
);

Basic.parameters = {
  jest: ['EmptyState.test.tsx'],
};
