import React from 'react'
import PropTypes from 'prop-types'

import { ContainerWrapper, ButtonWrapper, IconWrapper } from './styled'

const TableActionButton = ({ ...others }) => {
  return (
    <ContainerWrapper column={false}>
      <IconWrapper icon='eye' />
      <IconWrapper icon='pencil' />
      <ButtonWrapper>
        <IconWrapper icon='trash' />
      </ButtonWrapper>
    </ContainerWrapper>
  )
}

TableActionButton.propTypes = {}

export default React.memo(TableActionButton)
