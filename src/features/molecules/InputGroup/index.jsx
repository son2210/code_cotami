import React from 'react'
import PropTypes from 'prop-types'
import {
  WrapperContainer,
  WrapperInputGroup,
  WrapperAddon,
  WrapperInput,
  WrapperButton
} from './styled'
import { BaseHelpText } from 'atoms'
import { useTheme } from 'styled-components'

const InputGroup = ({
  LeftSide,
  RightSide,
  isError,
  helpText,
  value,
  onChange,
  ...others
}) => {
  const theme = useTheme()
  return (
    <WrapperContainer>
      <WrapperInputGroup
        style={{
          borderColor: isError
            ? theme.colors.error
            : theme.colors.primary[5]
        }}
      >
        {LeftSide && <WrapperAddon>{LeftSide}</WrapperAddon>}
        <WrapperInput
          onChange={onChange}
          value={value}
          {...others}
        ></WrapperInput>
        {RightSide && (
          <WrapperButton onClick={RightSide.onClick}>
            {RightSide.icon}
          </WrapperButton>
        )}
      </WrapperInputGroup>
      {helpText && <BaseHelpText isError={isError}>{helpText}</BaseHelpText>}
    </WrapperContainer>
  )
}

InputGroup.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  LeftSide: PropTypes.node,
  RightSide: PropTypes.shape({
    icon: PropTypes.node,
    onClick: PropTypes.func
  }),
  isError: PropTypes.bool,
  tooltip: PropTypes.string
}

export default React.memo(InputGroup)
