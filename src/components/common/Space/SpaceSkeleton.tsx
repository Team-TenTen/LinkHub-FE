import Skeleton from '../Skeleton/Skeleton'

interface SpaceSkeletonProps {
  type?: 'Card' | 'Header'
}

const SpaceSkeleton = ({ type }: SpaceSkeletonProps) => {
  return (
    <>
      {type === 'Card' ? (
        <div className="relative flex gap-3 rounded-md border border-slate3 p-2">
          <div className="flex grow flex-col justify-center gap-1 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/2" />
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col gap-10 rounded-md border border-slate3 p-4">
          <div className="flex justify-end gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex flex-col gap-1.5 rounded-md border border-slate3 bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      )}
    </>
  )
}

export default SpaceSkeleton
