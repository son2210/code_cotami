import PropTypes from 'prop-types'
import React, { useRef, useState, useCallback } from 'react'
import { Label, Wrapper, TagItem, TagGroupWrapper } from './styled'
import { Input, IconButton, Icon } from 'rsuite'

const DynamicTag = ({ label, value, onChange, ...rest }) => {
  const [typing, setTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [tag, setTag] = useState([...value])
  const input = useRef()

  const handleButtonClick = useCallback(() => {
    setTyping(true)
  }, [typing, input])

  const handleInputChange = useCallback(
    e => {
      setInputValue(e)
    },
    [inputValue]
  )

  const handleInputConfirm = useCallback(() => {
    const nextTags = inputValue ? [...tag, inputValue] : tag
    setTag(nextTags)
    if (typeof onChange === 'function') onChange(nextTags)
    setTyping(false)
    setInputValue('')
  }, [tag, typing, inputValue])

  const handleTagRemove = useCallback(
    tagItem => {
      const nextTags = tag.filter(item => item !== tagItem)
      if (typeof onChange === 'function') onChange(nextTags)
      setTag(nextTags)
    },
    [tag]
  )

  const renderInput = useCallback(() => {
    return typing ? (
      <Input
        id='tag-input'
        inputRef={ref => {
          input.current = ref
          input.current?.focus()
        }}
        size='xs'
        style={{ width: 70 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    ) : (
      <IconButton
        className='tag-add-btn'
        onClick={handleButtonClick}
        appearance='ghost'
        icon={<Icon icon='plus' />}
        size='xs'
      />
    )
  }, [typing, inputValue, input])

  return (
    <Wrapper {...rest}>
      <Label className='label'>{label}</Label>

      <TagGroupWrapper>
        {tag.map((item, index) => (
          <TagItem key={index} closable onClose={() => handleTagRemove(item)}>
            {item}
          </TagItem>
        ))}
        {renderInput()}
      </TagGroupWrapper>
    </Wrapper>
  )
}

DynamicTag.propTypes = {
  label: PropTypes.string,
  bold: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default React.memo(DynamicTag)
