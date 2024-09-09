const LinkSkeleton = () => {
  return (
    <div className="mr-4 min-w-[164px]">
      <div className="flex min-h-[101.5px] flex-col justify-between gap-1 rounded-md border border-slate3 px-3 py-2.5">
        <div className="button-round h-[20px] w-3/4 bg-slate-100 text-sm font-medium text-gray9 dark:bg-slate-800" />
        <div>
          <div className="button-round inline-flex h-[24px] w-[40.74px] rounded-xl bg-slate-100 px-2.5 py-1 text-center text-xs font-medium dark:bg-slate-800" />
        </div>
        <div className="flex items-center justify-end">
          <div className="button-round h-[26px] w-[41.28px] bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}

const PopularLinkSkeleton = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex">
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
        <LinkSkeleton />
      </div>
    </div>
  )
}

export default PopularLinkSkeleton
