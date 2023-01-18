import React from 'react'
import { render } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar Component', () => {
  test('it should match the snapshot', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Avatar src="/assets/avatars/3.jpg" />)
    expect(wrapper).toMatchSnapshot()
  })

  test('Showing default avatar in case of no src', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Avatar src={''} />)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const avatar = wrapper.getByRole('img')
    expect(avatar).toHaveAttribute('src', '/assets/defaultAvatar.svg')
    expect(avatar).toHaveAttribute('alt', 'avatar')
  })
})
