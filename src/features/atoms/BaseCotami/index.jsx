import React from 'react'
import { CotamiWrapper } from './styled'
import PropTypes from 'prop-types'
import { IMAGES } from 'assets'

const BaseCotami = ({ children, ...others }) => {
  return (
    <CotamiWrapper source={IMAGES.COTAMI} {...others}>
      {/* C<u>O</u>TAMI */}
      {children}
    </CotamiWrapper>
  )
}

BaseCotami.propTypes = {
  children: PropTypes.any
}

export default React.memo(BaseCotami)
