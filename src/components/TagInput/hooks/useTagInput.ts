import { FocusEvent, MouseEvent, useCallback, useEffect } from 'react'
import { useState } from 'react'
import { ChipColors } from '@/components/common/Chip/Chip'
import { Tag } from '@/components/common/Space/hooks/useGetTags'
import { getRandomColor } from '@/utils'
import { debounce } from 'lodash'
import { TagInputProps } from '../TagInput'

const useTagInput = ({ tags, setValue }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags)
  const [selectedTag, setSelectedTag] = useState<Pick<Tag, 'name' | 'color'>>()
  const [isFocused, setIsFocused] = useState(false)

  const updateFilteredTags = debounce((input: string) => {
    const filteredTagArr = tags.filter((tag) => tag.name.includes(input))
    setFilteredTags(filteredTagArr)
  }, 200)

  const findExistingTag = useCallback(
    (inputValue: string) => {
      const existingTag = tags.find((tag) => tag.name === inputValue)
      if (existingTag) {
        setSelectedTag({ name: existingTag.name, color: existingTag.color })
      } else {
        setSelectedTag({
          name: inputValue,
          color: getRandomColor() as ChipColors,
        })
      }
    },
    [tags],
  )

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
      updateFilteredTags(e.currentTarget.value)
    },
    [updateFilteredTags],
  )

  const handleOnKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value.trim()
      if (e.key === 'Enter') {
        findExistingTag(inputValue)
      }
    },
    [findExistingTag],
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value.trim()

      if (inputValue) {
        findExistingTag(inputValue)
      }
      setIsFocused(false)
    },
    [findExistingTag],
  )

  const handleTagClick = useCallback((name: string, color: ChipColors) => {
    setSelectedTag({ name, color })
  }, [])

  const handleRemoveClick = () => {
    setSelectedTag(undefined)
    setFilteredTags(tags)
  }

  const handleTagMouseDown = useCallback((e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      setValue('tagName', selectedTag.name)
      setValue('color', selectedTag.color)
    } else {
      setValue('tagName', '')
      setValue('color', '')
    }
    setIsFocused(false)
    setInputValue('')
  }, [selectedTag, setValue])

  return {
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
  }
}

export default useTagInput
