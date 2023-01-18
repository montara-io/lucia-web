import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import Card from './Card'

describe('Test Card Component', () => {
  it('Snapshot renders correctly', () => {
    const clickFn = jest.fn()
    expect(
      <Card helpLinkOnClick={clickFn} helpLinkTooltip="tooltip">
        <div>Test</div>
      </Card>,
    ).toMatchSnapshot()
  })

  it('Snapshot renders correctly with internal link', () => {
    expect(
      <Card
        internalLink={{
          text: 'more',
          callback: () => {},
        }}
      >
        <div>Test</div>
      </Card>,
    ).toMatchSnapshot()
  })
})
