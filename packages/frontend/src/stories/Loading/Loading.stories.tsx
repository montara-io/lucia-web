import React from 'react'
import Loading from './Loading'

export default {
  title: 'Components/Loading',
  component: Loading,
}

export const Primary = (args: any) => <Loading {...args} />

Primary.args = {
  id: 'id',
  mode: 'dark',
}
Primary.parameters = {
  jest: ['Loading.test.tsx'],
}
