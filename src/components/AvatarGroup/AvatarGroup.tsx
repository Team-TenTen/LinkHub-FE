import React from 'react'
import { AvatarProps } from '../Avatar/Avatar'
import {
  DEFAULT_LIMIT,
  DEFAULT_SIZE,
  MARGIN_LEFT_DIVIDE,
  PADDING_LEFT_DIVIDE,
} from './constants'

export interface AvatarGroupProps {
  children: React.ReactNode
  size?: number
  limit?: number
}

const AvatarGroup = ({
  children,
  size = DEFAULT_SIZE,
  limit = DEFAULT_LIMIT,
}: AvatarGroupProps) => {
  const allAvatars = React.Children.toArray(children)
  const avatars = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<AvatarProps> => {
      return true
    })
    .slice(0, limit)
    .map((avatar, index, avatars) => {
      return React.cloneElement(avatar, {
        style: {
          marginLeft: -size / MARGIN_LEFT_DIVIDE,
          zIndex: avatars.length - index,
        },
      })
    })

  return (
    <div className="inline-flex items-center gap-0.5">
      <div
        className="flex"
        style={{ paddingLeft: size / PADDING_LEFT_DIVIDE }}>
        {avatars.map((avatar) => (
          <div
            className="flex"
            key={avatar.key}
            style={avatar.props.style}>
            {avatar}
          </div>
        ))}
      </div>
      {allAvatars.length > limit && (
        <div className="text-xs font-normal leading-4 text-gray-600">
          +{allAvatars.length - limit}명
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
