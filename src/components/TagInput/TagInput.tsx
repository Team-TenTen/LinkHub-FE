import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { cls } from '@/utils'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Chip from '../common/Chip/Chip'
import { COLORS } from '../common/Chip/constants'
import { CreateLinkFormValue } from '../common/LinkList/LinkList'
import {
  LINK_FORM_PLACEHOLDER,
  LINK_FORM_VALIDATION,
} from '../common/LinkList/constants'
import { Tag } from '../common/Space/hooks/useGetTags'
import useTagInput from './hooks/useTagInput'

export interface TagInputProps {
  tags: Tag[]
  register: UseFormRegister<CreateLinkFormValue>
  setValue: UseFormSetValue<CreateLinkFormValue>
  getValues?: UseFormGetValues<CreateLinkFormValue>
  clearErrors?: UseFormClearErrors<CreateLinkFormValue>
  validation?: string
}

const TagInput = ({
  tags,
  register,
  setValue,
  getValues,
  clearErrors,
  validation,
}: TagInputProps) => {
  const {
    filteredTags,
    selectedTag,
    isFocused,
    updateFilteredTags,
    findExistingTag,
    setIsFocused,
    handleFocus,
    handleKeyPress,
    handleTagClick,
    handleRemoveClick,
    handleTagMouseDown,
  } = useTagInput({ tags, register, setValue, getValues, clearErrors })

  return (
    <div className="flex flex-col justify-center">
      <label className="py-2 text-sm font-semibold text-gray9">태그</label>
      <div className="">
        <div className="flex rounded-md border border-slate5 bg-bgColor px-3 py-2.5">
          {selectedTag && (
            <button
              className={cls(
                'inline-flex rounded-xl py-1 pl-2.5 text-center text-xs font-medium ',
                COLORS[selectedTag.color],
              )}
              value={selectedTag.name}
              type="button"
              onClick={handleRemoveClick}>
              {selectedTag.name}
              <XMarkIcon className="ml-0.5 mr-2 h-4 w-4" />
            </button>
          )}
          <input
            className="w-full py-0.5 text-sm font-medium text-gray9 placeholder-gray4 outline-none"
            type={selectedTag && 'hidden'}
            placeholder={LINK_FORM_PLACEHOLDER.TAG}
            {...register('tagName', {
              maxLength: {
                value: 10,
                message: LINK_FORM_VALIDATION.TAG_LENGTH,
              },
              onChange: (e) => {
                updateFilteredTags(e.target.value)
              },
              onBlur: (e) => {
                const value = e.target.value.trim()
                if (value) {
                  findExistingTag(value)
                }
                setValue('tagName', value)
                setIsFocused(false)
              },
            })}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
          />
        </div>
        {validation && (
          <span className="py-2 text-xs font-normal text-red6">
            {validation}
          </span>
        )}
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
                  color={tag.color}
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
