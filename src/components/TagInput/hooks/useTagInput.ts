import { MouseEvent, useCallback, useEffect } from 'react'
import { useState } from 'react'
import { ChipColors } from '@/components/common/Chip/Chip'
import { Tag } from '@/components/common/Space/hooks/useGetTags'
import { getRandomColor } from '@/utils'
import { debounce } from 'lodash'
import { TagInputProps } from '../TagInput'

const useTagInput = ({
  tags,
  setValue,
  getValues,
  clearErrors,
}: TagInputProps) => {
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

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value.trim()
      if (e.key === 'Enter' && inputValue) {
        findExistingTag(inputValue)
      }
    },
    [findExistingTag],
  )

  const handleTagClick = useCallback((name: string, color: ChipColors) => {
    setSelectedTag({ name, color })
  }, [])

  const handleRemoveClick = () => {
    setValue('tagName', '')
    setValue('color', '')
    clearErrors?.('tagName')
    setSelectedTag(undefined)
    setFilteredTags(tags)
  }

  const handleTagMouseDown = useCallback((e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    const tagName = getValues?.('tagName')
    const color = getValues?.('color') as ChipColors

    if (tagName && color) {
      setSelectedTag({ name: tagName, color })
    }
  }, [getValues])

  useEffect(() => {
    if (selectedTag) {
      setValue('tagName', selectedTag.name)
      setValue('color', selectedTag.color)
    }
    setIsFocused(false)
  }, [selectedTag, setValue])

  return {
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
  }
}

export default useTagInput
