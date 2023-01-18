import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Menu, { MenuProps } from './Menu';

describe('Test Menu Component', () => {
  let props: MenuProps;
  const handleClick1 = jest.fn();
  const handleClick2 = jest.fn();
  const handleToggle = jest.fn();

  beforeEach(() => {
    props = {
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
                command: handleClick1,
              },
            ],
          },
          {
            label: 'MY TEAM',
            items: [
              {
                id: 'team-engagement',
                label: 'ENGAGEMENT',
                icon: '/assets/icons/pulse.svg',
                command: handleClick2,
                disabled: true,
              },
              {
                id: 'team-productivity',
                label: 'PRODUCTIVITY',
                icon: '/assets/icons/energy.svg',
                command: () => {},
              },
              {
                id: 'team-wellbeing',
                label: 'WELLBEING',
                icon: '/assets/icons/calm.svg',
                command: () => {},
              },
              {
                id: 'team-team-members',
                label: 'TEAM MEMBERS',
                icon: '/assets/icons/team.svg',
                command: () => {},
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
                command: () => {},
              },
              {
                id: 'wellbeing',
                label: 'WELLBEING',
                icon: '/assets/icons/calm.svg',
                command: () => {},
              },
              {
                id: 'leadership',
                label: 'LEADERSHIP',
                icon: '/assets/icons/goal.svg',
                command: () => {},
              },
              {
                id: 'career',
                label: 'CAREER GROWTH',
                icon: '/assets/icons/compass.svg',
                command: () => {},
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
                command: () => {},
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
      onExpanded: handleToggle,
      defaultSelected: 'dashboard',
    };
  });

  it('should fire command event', () => {
    const { getByText } = render(<Menu {...props} />);
    const menuItem = getByText('DASHBOARD');
    expect(handleClick1).toHaveBeenCalledTimes(0);
    fireEvent.click(menuItem);
    expect(handleClick1).toHaveBeenCalledTimes(1);
  });

  it('should not fire command event on disabled item', () => {
    const { getByText } = render(<Menu {...props} />);
    const menuItem = getByText('ENGAGEMENT');
    expect(handleClick2).toHaveBeenCalledTimes(0);
    fireEvent.click(menuItem);
    expect(handleClick2).toHaveBeenCalledTimes(0);
  });

  it('should fire onToggle event', () => {
    const { getByRole } = render(<Menu {...props} />);
    const toggleSwitchBtn = getByRole('button');
    expect(handleToggle).toHaveBeenCalledTimes(0);
    fireEvent.click(toggleSwitchBtn);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('Snapshot renders correctly', () => {
    const wrapper = render(<Menu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should disable entire section', () => {
    props = {
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
                command: handleClick1,
              },
            ],
          },
          {
            label: 'MY TEAM',
            disabled: true,
            items: [
              {
                id: 'team-engagement',
                label: 'ENGAGEMENT',
                icon: '/assets/icons/pulse.svg',
                command: handleClick2,
              },
              {
                id: 'team-productivity',
                label: 'PRODUCTIVITY',
                icon: '/assets/icons/energy.svg',
                command: () => {},
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
                command: () => {},
              },
              {
                id: 'wellbeing',
                label: 'WELLBEING',
                icon: '/assets/icons/calm.svg',
                command: () => {},
              },
              {
                id: 'leadership',
                label: 'LEADERSHIP',
                icon: '/assets/icons/goal.svg',
                command: () => {},
              },
              {
                id: 'career',
                label: 'CAREER GROWTH',
                icon: '/assets/icons/compass.svg',
                command: () => {},
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
                command: () => {},
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
      onExpanded: handleToggle,
      defaultSelected: 'dashboard',
    };

    const wrapper = render(<Menu {...props} />);
    const engagementText = wrapper.getByText('ENGAGEMENT');

    expect(engagementText.parentElement?.parentElement?.outerHTML.includes('disabled')).toBe(true);

    const productivityText = wrapper.getAllByText('PRODUCTIVITY')[0];
    expect(productivityText.parentElement?.parentElement?.outerHTML.includes('disabled')).toBe(
      true,
    );

    expect(wrapper.getByTestId('m-shield')).toBeInTheDocument();
  });
});
