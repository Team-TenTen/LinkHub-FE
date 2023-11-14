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
  return (
    <div className="inline-block">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={cls(
          className,
          'rounded-full border border-slate3 object-cover',
        )}
      />
    </div>
  )
}

export default Avatar
