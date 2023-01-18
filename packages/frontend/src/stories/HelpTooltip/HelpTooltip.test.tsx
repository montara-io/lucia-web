import React from 'react'
import HelpTooltip, { HelpTooltipProps } from './HelpTooltip'

describe('Test HelpTooltip Component', () => {
  let props: HelpTooltipProps

  beforeEach(() => {
    props = {}
  })

  it('Snapshot renders correctly', () => {
    expect(<HelpTooltip {...props}>Text</HelpTooltip>).toMatchSnapshot()
  })
})
