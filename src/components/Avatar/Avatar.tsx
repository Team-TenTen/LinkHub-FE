import { CSSProperties } from 'react'
import Image from 'next/image'

export interface AvatarProps {
  src: string
  width: number
  height: number
  alt: string
  style?: CSSProperties
}

const Avatar = ({ src, width, height, alt }: AvatarProps) => {
  return (
    <div className="inline-block">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="rounded-full border border-gray-300 object-cover"
      />
    </div>
  )
}

export default Avatar
