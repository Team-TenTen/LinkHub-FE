const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-[1200px] flex-col">{children}</div>
    </div>
  )
}

export default SearchLayout
