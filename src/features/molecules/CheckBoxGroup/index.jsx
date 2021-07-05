import React from 'react'
import PropTypes from 'prop-types'
import { BaseCheckbox } from 'atoms'

import { Wrapper } from './styled'

const CheckBoxGroup = ({
  inline = false,
  value,
  onChange,
  options,
  ...others
}) => {
  return (
    <Wrapper inline={inline} value={value} onChange={onChange} {...others}>
      {options.map((item, index) => (
        <BaseCheckbox
          key={index}
          content={item.content}
          id={item.id}
          {...item.others}
        />
      ))}
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
  ).isRequired
}

export default React.memo(CheckBoxGroup)
