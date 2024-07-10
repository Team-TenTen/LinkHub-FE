import Skeleton from '../Skeleton/Skeleton'

export interface LinkItemSkeletonProps {
  type?: 'list' | 'card'
}

const LinkItemSkeleton = ({ type }: LinkItemSkeletonProps) => {
  return (
    <>
      {type === 'list' ? (
        <div className="flex items-center justify-between gap-2 border-t border-slate3 px-3 py-2 last:border-b">
          <Skeleton className="h-5 w-3/4" />
        </div>
      ) : (
        <div className="flex">
          <div className="mr-4 flex min-h-[101.5px] w-[214.47px] flex-col justify-between gap-1 rounded-md border border-slate3 px-3 py-2.5">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-10" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
          <div className="mr-4 flex min-h-[101.5px] w-[214.47px] flex-col justify-between gap-1 rounded-md border border-slate3 px-3 py-2.5">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-10" />
            <div className="flex items-center justify-end">
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LinkItemSkeleton
