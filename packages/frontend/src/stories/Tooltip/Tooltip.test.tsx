import React from 'react'
import { render } from '@testing-library/react'
import Tooltip, { TooltipProps } from './Tooltip'

describe('Test Tooltip Component', () => {
  let props: TooltipProps

  beforeEach(() => {
    props = {
      position: 'top',
      children: null,
    }
  })

  it('Snapshot renders correctly', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Tooltip {...props}>Text</Tooltip>)
    expect(wrapper).toMatchSnapshot()
  })
})
