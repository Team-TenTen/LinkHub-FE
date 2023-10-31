interface TabProps {
  children?: React.ReactNode
}

const Tab = ({ children }: TabProps) => {
  return <div className="flex transition ease-in-out">{children}</div>
}

export default Tab
