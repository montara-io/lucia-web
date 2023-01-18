import * as React from 'react'
import Tooltip from './Tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

export const Basic = ({ position, text }: any): JSX.Element => (
  <div style={{ position: 'absolute', marginTop: '15px' }}>
    <Tooltip position={position}>{text}</Tooltip>
  </div>
)

Basic.args = {
  text: 'text',
  position: 'right',
}

Basic.parameters = {
  jest: ['Tooltip.test.tsx'],
}
