import React from 'react'
import PropTypes from 'prop-types'
import { RadioGroup } from 'rsuite'
import { BaseRadio } from 'atoms'

const RadioForm = ({ inline = true, value, onChange, options, ...others }) => {
  return (
    <RadioGroup inline={inline} value={value} onChange={onChange} {...others}>
      {options.map((item, index) => (
        <BaseRadio
          key={index}
          value={item.value}
          label={item.label}
          {...item.others}
        />
      ))}
    </RadioGroup>
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
