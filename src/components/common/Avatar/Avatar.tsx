'use client'

import { CSSProperties } from 'react'
import { cls } from '@/utils'
import Image from 'next/image'

export interface AvatarProps {
  src: string
  alt: string
  style?: CSSProperties
  className?: string
}

const Avatar = ({ src, alt, className }: AvatarProps) => {
  return (
    <Image
      priority
      src={src}
      alt={alt}
      fill
      className={cls(
        className,
        'rounded-full border border-slate3 object-cover',
      )}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
    />
  )
}

export default Avatar
