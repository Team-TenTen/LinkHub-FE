import { UseFormSetValue } from 'react-hook-form'
import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Chip, { ChipColors } from '../common/Chip/Chip'
import { COLORS } from '../common/Chip/constants'
import { CreateLinkFormValue } from '../common/LinkList/LinkList'
import { Tag } from '../common/Space/hooks/useGetTags'
import useTagInput from './hooks/useTagInput'

export interface TagInputProps {
  tags: Tag[]
  setValue: UseFormSetValue<CreateLinkFormValue>
}

const TagInput = ({ tags, setValue }: TagInputProps) => {
  const {
    inputValue,
    filteredTags,
    selectedTag,
    isFocused,
    handleChange,
    handleOnKeyPress,
    handleFocus,
    handleBlur,
    handleTagClick,
    handleRemoveClick,
    handleTagMouseDown,
  } = useTagInput({ tags, setValue })

  return (
    <div className="flex flex-col justify-center">
      <label className="py-2 text-sm font-semibold text-gray9">태그</label>
      <div className="">
        <div className="flex rounded-md border border-slate5 bg-bgColor px-3 py-2.5">
          {selectedTag ? (
            <button
              className={cls(
                'inline-flex rounded-xl py-1 pl-2.5 text-center text-xs font-medium ',
                COLORS[selectedTag.color as ChipColors],
              )}
              value={selectedTag.name}
              type="button"
              onClick={handleRemoveClick}>
              {selectedTag.name}
              <XMarkIcon className="ml-0.5 mr-2 h-4 w-4" />
            </button>
          ) : (
            <input
              className="w-full py-0.5 text-sm font-medium text-gray9 placeholder-gray4 outline-none"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleOnKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        </div>
        {isFocused && filteredTags && filteredTags.length > 0 && (
          <ul className="select-tag-list absolute mt-2 flex flex-col overflow-y-scroll rounded-md border border-slate5 bg-bgColor px-2 py-2 shadow-lg">
            {filteredTags.map((tag) => (
              <li
                className="rounded-md px-1 py-1 hover:bg-slate1"
                onClick={() => handleTagClick(tag.name, tag.color)}
                onMouseDown={handleTagMouseDown}
                key={tag.tagId}>
                <Chip
                  label={tag.name}
                  color={tag.color as ChipColors}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TagInput
