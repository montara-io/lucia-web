import * as React from 'react'
import HelpTooltip from './HelpTooltip'

export default {
  title: 'Components/HelpTooltip',
  component: HelpTooltip,
}

export const Basic = () => (
  <div style={{ position: 'absolute', marginTop: '15px' }}>
    <HelpTooltip>Some text here</HelpTooltip>
  </div>
)

Basic.args = {}

Basic.parameters = {
  jest: ['HelpTooltip.test.tsx'],
}

export const Left = () => (
  <div style={{ position: 'absolute', marginTop: '15px' }}>
    <HelpTooltip helpTooltipPosition={'top'}>Some text here</HelpTooltip>
  </div>
)
