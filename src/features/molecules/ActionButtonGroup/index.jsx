import React from 'react'
import PropTypes from 'prop-types'

import {
  ContainerWrapper,
  ButtonWrapper,
  IconWrapper,
  WrapperBlock,
  Icon,
  Title
} from './styled'
import { IMAGES } from 'assets'

const ActionButtonGroup = ({
  preview,
  onClickDelete,
  onClickEdit,
  hiddenEye = false,
  copyAble = false,
  copy,
  id,
  ...others
}) => {
  return (
    <ContainerWrapper {...others}>
      {copyAble && (
        <WrapperBlock
          onClick={() => {
            if (typeof copy === 'function') copy(id, 'copy')
          }}
        >
          <Icon name={'copy-o'} /> <Title>Copy</Title>
        </WrapperBlock>
      )}
      {!hiddenEye && (
        <IconWrapper
          source={IMAGES.EYE}
          onClick={() => {
            if (typeof preview === 'function') preview(id, 'view')
          }}
        />
      )}
      <IconWrapper
        source={IMAGES.NOTE}
        onClick={() => {
          if (typeof onClickEdit === 'function') onClickEdit(id, 'edit')
        }}
      />
      <ButtonWrapper
        onClick={() => {
          if (typeof onClickDelete === 'function') onClickDelete(id, 'delete')
        }}
      >
        <IconWrapper btnIcon source={IMAGES.TRASH} />
      </ButtonWrapper>
    </ContainerWrapper>
  )
}

ActionButtonGroup.propTypes = {
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  hiddenEye: PropTypes.bool,
  preview: PropTypes.func,
  copyAble: PropTypes.bool,
  copy: PropTypes.func,
  id: PropTypes.any
}

export default React.memo(ActionButtonGroup)
