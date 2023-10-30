interface TabItemProps {
  active?: boolean
  text?: string
}

const TabItem = ({ active, text }: TabItemProps) => {
  return <div className={active ? 'active' : ''}>{text}</div>
}

export default TabItem
