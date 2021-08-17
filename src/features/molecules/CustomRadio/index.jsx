import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Wrapper, WrapperItem, Checkbox, Input, Icon } from './styled'
import { BaseRadio } from 'atoms'
import { withNumber, withBoolean } from 'exp-value'

const CustomRadio = ({
  inline = true,
  value,
  onChange,
  sectionItems,
  setSectionItems,
  addItem = false,
  ...others
}) => {
  const [data, setData] = useState([])
  const [item, setItem] = useState('')
  const handleChangeItem = useCallback(e => setItem(e), [item])
  const addDataItem = useCallback(() => {
    if (!item) return
    setItem('')
    setSectionItems([...sectionItems, { value: item }])
    setData([...data, { value: item, label: item }])
  }, [item])

  const removeDataItem = useCallback(
    indexItem => {
      if (indexItem < 0 || indexItem > sectionItems.length) return
      if (!withBoolean('id', sectionItems[indexItem]))
        setSectionItems(sectionItems.filter((_, index) => index !== indexItem))
      const temp = sectionItems
      temp[indexItem].markDelete = true
      setSectionItems(temp)
      setData(data.filter((_, index) => index !== indexItem))
    },
    [sectionItems]
  )

  const updateDataItem = useCallback(
    (value, indexItem) => {
      if (indexItem < 0 || indexItem > sectionItems.length) return
      const temp = JSON.parse(JSON.stringify(sectionItems))
      temp[indexItem].value = value
      setSectionItems(temp)

      const tmp2 = JSON.parse(JSON.stringify(sectionItems))
      tmp2[indexItem].content = value
      setData(tmp2)
    },
    [data]
  )

  const renderForm = useCallback(
    data => {
      return data?.map((item, index) => {
        if (!addItem)
          return <BaseRadio key={index} value={item.value} label={item.label} />
        return (
          <WrapperItem key={index}>
            {addItem && (
              <Checkbox
                onClick={() => removeDataItem(index)}
                style={{ borderWidth: 0 }}
              >
                <Icon name='feather-x' size={16} />
              </Checkbox>
            )}
            <Input
              value={item.value}
              onChange={value => updateDataItem(value, index)}
            />
          </WrapperItem>
        )
      })
    },
    [sectionItems, data, addItem]
  )
  useEffect(() => {
    if (sectionItems) {
      if (withNumber('length', sectionItems) < 1) return setData([])
      const temp = sectionItems.map(item => {
        if (withBoolean('markDelete', item)) return
        return {
          value: item.value,
          label: item.value
        }
      })
      return setData(temp)
    }
  }, [sectionItems, addItem, value])

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

CustomRadio.propTypes = {
  inline: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.any,
  addItem: PropTypes.bool,
  setSectionItems: PropTypes.func,
  sectionItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.any
    })
  )
}

export default React.memo(CustomRadio)
