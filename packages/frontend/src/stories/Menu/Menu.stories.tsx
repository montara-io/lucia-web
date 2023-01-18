import React from 'react';
import Menu from './Menu';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Menu',
  component: Menu,
};

export const Basic = (args) => {
  return <Menu {...args} />;
};

Basic.args = {
  id: 'menu',
  profileImage: '/assets/avatar.png',
  model: {
    body: [
      {
        label: '',
        items: [
          {
            id: 'dashboard',
            label: 'DASHBOARD',
            icon: '/assets/icons/home.svg',
            command: action('clicked'),
          },
        ],
      },
      {
        label: 'TEAM',
        items: [
          {
            id: 'team-engagement',
            label: 'ENGAGEMENT',
            icon: '/assets/icons/pulse.svg',
            command: action('clicked'),
          },
          {
            id: 'team-productivity',
            label: 'PRODUCTIVITY',
            icon: '/assets/icons/energy.svg',
            command: action('clicked'),
          },
          {
            id: 'team-wellbeing',
            label: 'WELLBEING',
            icon: '/assets/icons/calm.svg',
            command: action('clicked'),
            disabled: true,
          },
          {
            id: 'team-team-members',
            label: 'TEAM MEMBERS',
            icon: '/assets/icons/team.svg',
            command: action('clicked'),
            disabled: true,
          },
        ],
      },
      {
        label: 'ME',
        items: [
          {
            id: 'productivity',
            label: 'PRODUCTIVITY',
            icon: '/assets/icons/energy.svg',
            command: action('clicked'),
          },
          {
            id: 'wellbeing',
            label: 'WELLBEING',
            icon: '/assets/icons/calm.svg',
            command: action('clicked'),
          },
          {
            id: 'leadership',
            label: 'LEADERSHIP',
            icon: '/assets/icons/goal.svg',
            command: action('clicked'),
          },
          {
            id: 'career',
            label: 'CAREER GROWTH',
            icon: '/assets/icons/compass.svg',
            command: action('clicked'),
          },
        ],
      },
    ],
    footer: [
      {
        label: '',
        items: [
          {
            id: 'settings',
            label: 'SETTINGS',
            icon: '/assets/icons/settings.svg',
            command: action('clicked'),
          },
          {
            id: 'logout',
            label: 'LOGOUT',
            icon: '/assets/icons/log-out.svg',
          },
        ],
      },
    ],
  },
  onSelected: action('Selected'),
  onExpanded: action('Expanded'),
  defaultSelected: 'dashboard',
};

export const SlimManager = (args) => {
  return <Menu {...args} />;
};

SlimManager.args = {
  id: 'menu',
  profileImage: '/assets/avatar.png',
  model: {
    body: [
      {
        label: '',
        items: [
          {
            id: 'dashboard',
            label: 'DASHBOARD',
            icon: '/assets/icons/home.svg',
            command: action('clicked'),
          },
        ],
      },
      {
        label: 'TEAM',
        disabled: true,
        tooltip: {
          title: 'Team Safe Zone',
          content:
            'Montara respects your people’s privacy. These trackers are available for teams with at least 5 people.',
        },
        items: [
          {
            id: 'team-engagement',
            label: 'ENGAGEMENT',
            icon: '/assets/icons/pulse.svg',
            command: action('clicked'),
          },
          {
            id: 'team-productivity',
            label: 'PRODUCTIVITY',
            icon: '/assets/icons/energy.svg',
            command: action('clicked'),
          },
          {
            id: 'team-wellbeing',
            label: 'WELLBEING',
            icon: '/assets/icons/calm.svg',
            command: action('clicked'),
            disabled: true,
            tooltip: {
              title: 'Team Safe Zone',
              content:
                'Montara respects your people’s privacy. These trackers are available for teams with at least 5 people.',
            },
          },
          {
            id: 'team-team-members',
            label: 'TEAM MEMBERS',
            icon: '/assets/icons/team.svg',
            command: action('clicked'),
            disabled: true,
          },
        ],
      },
      {
        label: 'ME',
        items: [
          {
            id: 'productivity',
            label: 'PRODUCTIVITY',
            icon: '/assets/icons/energy.svg',
            command: action('clicked'),
          },
          {
            id: 'wellbeing',
            label: 'WELLBEING',
            icon: '/assets/icons/calm.svg',
            command: action('clicked'),
          },
          {
            id: 'leadership',
            label: 'LEADERSHIP',
            icon: '/assets/icons/goal.svg',
            command: action('clicked'),
          },
          {
            id: 'career',
            label: 'CAREER GROWTH',
            icon: '/assets/icons/compass.svg',
            command: action('clicked'),
          },
        ],
      },
    ],
    footer: [
      {
        label: '',
        items: [
          {
            id: 'settings',
            label: 'SETTINGS',
            icon: '/assets/icons/settings.svg',
            command: action('clicked'),
          },
          {
            id: 'logout',
            label: 'LOGOUT',
            icon: '/assets/icons/log-out.svg',
          },
        ],
      },
    ],
  },
  onSelected: action('Selected'),
  onExpanded: action('Expanded'),
  defaultSelected: 'dashboard',
};

Basic.parameters = {
  jest: ['Menu.test.tsx'],
};
