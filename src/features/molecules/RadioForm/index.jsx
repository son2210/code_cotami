import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, WrapperItem, Checkbox, Input, Icon } from './styled'
import { BaseRadio } from 'atoms'

const DEFAULT_OPTIONS = [
  {
    value: 'auto',
    label: 'auto'
  },
  {
    value: 'manual',
    label: 'manual'
  },
  {
    value: 'hide',
    label: 'hide'
  }
]

const RadioForm = ({
  inline = true,
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  addItem = false,
  ...others
}) => {
  const [data, setData] = useState(options)
  const [item, setItem] = useState('')
  const handleChangeItem = useCallback(e => setItem(e), [])
  const addDataItem = useCallback(() => {
    setData([...data, { value: item, label: item }])
  }, [item])

  const renderForm = useCallback(
    data => {
      return data?.map((item, index) => (
        <BaseRadio
          key={index}
          value={item.value}
          label={item.label}
          {...item.others}
        />
      ))
    },
    [data]
  )

  if (!options || options.length < 1) return null

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

RadioForm.propTypes = {
  inline: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
      others: PropTypes.any
    })
  ).isRequired,
  addItem: PropTypes.bool
}

export default React.memo(RadioForm)
