import React from 'react'
import { ContainerWrapper, AvatarWrapper, UploaderWrapper } from './styled'
import PropTypes from 'prop-types'
import { IMAGES } from 'assets'
import { BaseButton } from 'atoms'

const AvatarBlock = ({ hasUpload = true, disable, url, ...others }) => {
  return (
    <ContainerWrapper {...others}>
      <AvatarWrapper source={url || IMAGES.AVATAR} />
      {hasUpload && (
        <UploaderWrapper UpdateFile listType='picture-text'>
          <BaseButton blue disabled={disable}>
            Change avatar
          </BaseButton>
        </UploaderWrapper>
      )}
    </ContainerWrapper>
  )
}

AvatarBlock.propTypes = {
  children: PropTypes.node,
  hasUpload: PropTypes.bool,
  url: PropTypes.string,
  disable: PropTypes.bool
}

export default React.memo(AvatarBlock)
