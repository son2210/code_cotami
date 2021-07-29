import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BaseCheckbox } from 'atoms'

import { Wrapper, WrapperItem, Checkbox, Input, Icon } from './styled'
import { withNumber } from 'exp-value'

const CustomCheckbox = ({
  inline = false,
  value,
  onChange,
  options,
  sectionItems,
  setSectionItems,
  addItem = false,
  ...others
}) => {
  const [data, setData] = useState([])
  const [item, setItem] = useState('')
  const handleChangeItem = useCallback(e => setItem(e), [])

  const addDataItem = useCallback(() => {
    if (!item) return
    setItem('')
    setSectionItems([...sectionItems, { value: item }])
    setData([...data, { content: item, id: data.length + 1 }])
  }, [item])

  const removeDataItem = useCallback(
    id => {
      if (id < 0 || id > data.length) return
      setSectionItems(sectionItems.filter((_, index) => index !== id))
      setData(data.filter((_, index) => index !== id))
    },
    [sectionItems, data]
  )

  const renderForm = useCallback(
    data => {
      return data.map((item, index) => (
        <WrapperItem key={index}>
          <BaseCheckbox content={item.content} id={item.id} {...item.others} />
          <Checkbox
            onClick={() => removeDataItem(index)}
            style={{ borderWidth: 0 }}
          >
            <Icon name='feather-x' size={16} />
          </Checkbox>
        </WrapperItem>
      ))
    },
    [data]
  )

  useEffect(() => {
    if (withNumber('length', sectionItems) < 1) return
    if (sectionItems) {
      let temp = sectionItems?.map((item, index) => {
        return {
          content: item.value,
          id: index
        }
      })
      return setData(temp)
    }
    if (!options || options.length < 0) return null
    return setData(options)
  }, [sectionItems, options])

  return (
    <Wrapper inline={inline} value={value} onChange={onChange} {...others}>
      {renderForm(data)}

      {addItem ? (
        <WrapperItem>
          <Checkbox onClick={addDataItem}>
            <Icon name='feather-plus' size={16} />
          </Checkbox>
          <Input
            placeHolder='Add a item'
            value={item}
            onChange={handleChangeItem}
          />
        </WrapperItem>
      ) : null}
    </Wrapper>
  )
}

CustomCheckbox.propTypes = {
  inline: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      content: PropTypes.string,
      others: PropTypes.any
    })
  ),
  addItem: PropTypes.bool,
  setSectionItems: PropTypes.func,
  sectionItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.any
    })
  )
}

export default React.memo(CustomCheckbox)
