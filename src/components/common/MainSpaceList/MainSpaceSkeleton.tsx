import SpaceSkeleton from '../Space/SpaceSkeleton'

const MainSpaceSkeleton = () => {
  return (
    <ul className="flex flex-col gap-y-2 px-4 pt-2">
      <li>
        <SpaceSkeleton type="Card" />
      </li>
      <li>
        <SpaceSkeleton type="Card" />
      </li>
      <li>
        <SpaceSkeleton type="Card" />
      </li>
      <li>
        <SpaceSkeleton type="Card" />
      </li>
      <li>
        <SpaceSkeleton type="Card" />
      </li>
    </ul>
  )
}

export default MainSpaceSkeleton
