import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { BaseCheckbox } from 'atoms'

import { Wrapper, WrapperItem, Checkbox, Input, Icon } from './styled'

const CheckBoxGroup = ({
  inline = false,
  value,
  onChange,
  options,
  setOptions,
  addItem = false,
  ...others
}) => {
  const [data, setData] = useState(options)
  const [item, setItem] = useState('')
  const handleChangeItem = useCallback(e => setItem(e), [])
  const addDataItem = useCallback(() => {
    setOptions([...data, { content: item, id: data.length + 1 }])
    setData([...data, { content: item, id: data.length + 1 }])
  }, [item])
  const renderForm = useCallback(
    data => {
      return data.map((item, index) => (
        <BaseCheckbox
          key={index}
          content={item.content}
          id={item.id}
          {...item.others}
        />
      ))
    },
    [data]
  )
  if (!options || options.length < 0) return null

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

CheckBoxGroup.propTypes = {
  inline: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      content: PropTypes.string,
      others: PropTypes.any
    })
  ).isRequired,
  addItem: PropTypes.bool,
  setOptions: PropTypes.func
}

export default React.memo(CheckBoxGroup)
