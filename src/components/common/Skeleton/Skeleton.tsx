interface SkeletonProps {
  className?: string
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={
        className + ' rounded-xl bg-slate-100 dark:bg-slate-800 '
      }></div>
  )
}

export default Skeleton
