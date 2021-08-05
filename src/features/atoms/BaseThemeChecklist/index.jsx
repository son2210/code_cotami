import React from 'react'
import { Wrapper, Image, Title } from './styled'
import PropTypes from 'prop-types'

const BaseThemeChecklist = ({ imageUrl, content, ...others }) => {
  return (
    <Wrapper {...others}>
      <Image source={imageUrl} />
      <Title>{content || ''}</Title>
    </Wrapper>
  )
}

BaseThemeChecklist.propTypes = {
  imageUrl: PropTypes.string,
  content: PropTypes.string
}

export default React.memo(BaseThemeChecklist)
