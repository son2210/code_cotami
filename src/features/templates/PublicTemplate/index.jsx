import React from 'react'
import { WrapperContainer, HeaderWrapper } from './styled'
import PropTypes from 'prop-types'
import { BaseCotami } from 'atoms'

const PublicTemplate = ({ children, ...others }) => {
  return (
    <WrapperContainer {...others}>
      <HeaderWrapper>
        <BaseCotami />
      </HeaderWrapper>

      {children}
    </WrapperContainer>
  )
}
PublicTemplate.propTypes = {
  children: PropTypes.any
}
export default React.memo(PublicTemplate)
