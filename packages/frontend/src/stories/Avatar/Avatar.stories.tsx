import React from 'react'
import Avatar from './Avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar,
}

export const Basic = (args: any) => <Avatar {...args} />

Basic.args = {
  src: '/assets/avatars/3.jpg',
  alt: 'avatar',
}

export const NoImage = (args: any) => <Avatar {...args} />

NoImage.args = {
  src: 'mistake.png',
  alt: 'avatar',
}

Basic.parameters = {
  jest: ['Avatar.test.tsx'],
}
