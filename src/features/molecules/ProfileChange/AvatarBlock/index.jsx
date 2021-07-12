import React from 'react'
import { ContainerWrapper, AvatarWrapper, UploaderWrapper } from './styled'
import PropTypes from 'prop-types'
import { IMAGES } from 'assets'
import { BaseButton } from 'atoms'

const AvatarBlock = ({ hasUpload = true, url, ...others }) => {
  return (
    <ContainerWrapper>
      <AvatarWrapper source={IMAGES.AVATAR} />
      {hasUpload && (
        <UploaderWrapper UpdateFile listType='picture-text'>
          <BaseButton blue>Change avatar</BaseButton>
        </UploaderWrapper>
      )}
    </ContainerWrapper>
  )
}

AvatarBlock.propTypes = {
  children: PropTypes.node
}

export default React.memo(AvatarBlock)
