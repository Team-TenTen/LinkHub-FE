import { NOT_FOUND } from '@/constants'
import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-10 pb-24 text-gray9">
      <div className="text-3xl font-semibold">{NOT_FOUND.NOT_FOUND}</div>
      <Image
        className="rounded-lg"
        src={'/404.png'}
        width={240}
        height={300}
        alt="404"
      />
      <div className="flex flex-col items-center text-base">
        <div>{NOT_FOUND.TEXT_1}</div>
        <div>{NOT_FOUND.TEXT_2}</div>
        <div>{NOT_FOUND.TEXT_3}</div>
      </div>
    </div>
  )
}

export default NotFoundPage
