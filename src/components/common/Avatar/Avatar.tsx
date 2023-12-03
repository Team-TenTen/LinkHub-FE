import { CSSProperties } from 'react'
import { cls } from '@/utils'
import Image from 'next/image'

export interface AvatarProps {
  src: string
  width: number
  height: number
  alt: string
  style?: CSSProperties
  className?: string
}

const Avatar = ({ src, width, height, alt, className }: AvatarProps) => {
  const avatarStyle = `relative h-[${width}px] w-[${height}px]`

  return (
    <div className={avatarStyle}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className={cls(
          className,
          'rounded-full border border-slate3 object-cover',
        )}
      />
    </div>
  )
}

export default Avatar
