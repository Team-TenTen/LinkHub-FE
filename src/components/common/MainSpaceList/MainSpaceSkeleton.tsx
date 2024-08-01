const SpaceSkeleton = () => {
  return (
    <li>
      <a
        href="#"
        className="relative flex gap-3 rounded-md border border-slate3 p-2">
        <div className="flex grow flex-col justify-center gap-1 rounded-md bg-white bg-opacity-60 px-3 py-1.5 dark:bg-gray-900 dark:bg-opacity-60">
          <div className="h-[24px]">
            <div className="button-round h-[20px] w-3/4 bg-slate-100 text-sm font-medium dark:bg-slate-800" />
          </div>
          <div className="line-clamp-1 h-[16px] w-1/2 rounded-xl bg-slate-100 text-xs font-normal dark:bg-slate-800" />
          <div className="flex items-center pt-1">
            <div className="inline-flex h-[24px] w-1/5 rounded-xl bg-slate-100 px-2.5 py-1 text-center text-xs font-medium dark:bg-slate-800" />
          </div>
        </div>
      </a>
    </li>
  )
}

const MainSpaceSkeleton = () => {
  return (
    <ul
      className="mb-4 grid gap-4 gap-y-2 px-4 pt-2"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
      <SpaceSkeleton />
    </ul>
  )
}

export default MainSpaceSkeleton
