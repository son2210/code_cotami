import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styled'
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
  ...others
}) => {
  if (!options || options.length < 1) return null
  return (
    <Wrapper inline={inline} value={value} onChange={onChange} {...others}>
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
  ).isRequired
}

export default React.memo(RadioForm)
