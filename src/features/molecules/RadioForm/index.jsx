import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styled'
import { BaseRadio } from 'atoms'
import { Constant } from 'utils'

const RadioForm = ({
  inline = true,
  value,
  onChange,
  id,
  options = Constant.DEFAULT_OPTIONS,
  ...others
}) => {
  const [val, setVal] = useState(value)
  const handleChange = useCallback(
    e => {
      setVal(e)
      onChange(e, id)
    },
    [options, val]
  )
  if (!options || options.length < 1) return null
  return (
    <Wrapper inline={inline} value={val} onChange={handleChange} {...others}>
      {options?.map((item, index) => (
        <BaseRadio
          key={index}
          value={item.value}
          label={item.label}
          {...item.others}
        />
      ))}
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
  id: PropTypes.any
}

export default React.memo(RadioForm)
