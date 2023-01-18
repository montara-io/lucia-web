import React from 'react'
import { Avatar as PAvatar, AvatarProps } from 'primereact/avatar'
import { DEFAULT_AVATAR_IMG } from '../utils/consts'
import './Avatar.scss'

export type CustomAvatarProps = {
  src: string
  defaultSrc?: string
} & AvatarProps

const Avatar = (props: CustomAvatarProps) => {
  const { src, defaultSrc = DEFAULT_AVATAR_IMG } = props || {}

  const handleOnError = (e: any) => {
    e.target['src'] = defaultSrc
  }

  return (
    <PAvatar
      image={src || DEFAULT_AVATAR_IMG}
      size="large"
      shape="circle"
      onImageError={handleOnError}
      {...props}
    />
  )
}

export default Avatar
