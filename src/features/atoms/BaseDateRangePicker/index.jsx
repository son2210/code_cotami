import React from 'react'
import { Wrapper } from './styled'
import PropTypes from 'prop-types'

const BaseDateRangePicker = ({ ...others }) => {
  return <Wrapper {...others}></Wrapper>
}

BaseDateRangePicker.propTypes = {
  others:PropTypes.any
}

export default React.memo(BaseDateRangePicker)
