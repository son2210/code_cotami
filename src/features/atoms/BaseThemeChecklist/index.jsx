import React from 'react'
import { Wrapper, Image, Title } from './styled'
import PropTypes from 'prop-types'

const BaseThemeChecklist = ({ imageUrl, content, ...others }) => {
  return (
    <Wrapper {...others}>
      <Image src={imageUrl || 'https://picsum.photos/536/354'} />
      <Title>{content || 'Theme'}</Title>
    </Wrapper>
  )
}

BaseThemeChecklist.propTypes = {
  imageUrl: PropTypes.string,
  content: PropTypes.string
}

export default React.memo(BaseThemeChecklist)
