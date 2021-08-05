import React from 'react'
import { Wrapper } from './styled'
import PropTypes from 'prop-types'

const BaseDatePicker = ({ value, ...others }) => {
  return (
    <Wrapper
      value={value.length ? [new Date(value[0]), new Date(value[1])] : []}
      {...others}
    ></Wrapper>
  )
}

BaseDatePicker.propTypes = {
  value: PropTypes.array,
  others: PropTypes.any
}

export default React.memo(BaseDatePicker)
