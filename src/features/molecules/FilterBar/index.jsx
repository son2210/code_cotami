import React from 'react'
import PropTypes from 'prop-types'
import { ContainerWrapper, FilterWrapper, ButtonWrapper } from './styled'

const FilterBar = ({ hasButton = true, onClick, children, ...others }) => {
  return (
    <ContainerWrapper {...others}>
      <FilterWrapper>{children}</FilterWrapper>
      {hasButton && (
        <ButtonWrapper onClick={onClick} primary bold>
          + New
        </ButtonWrapper>
      )}
    </ContainerWrapper>
  )
}

FilterBar.propTypes = {
  hasButton: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
}

export default React.memo(FilterBar)
