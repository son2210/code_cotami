import styled, { css } from 'styled-components'
import { InputGroup, Input } from 'rsuite'

export const WrapperContainer = styled.div`
  position: relative;
  margin-bottom:20px;
`
export const WrapperInputGroup = styled(InputGroup)`
  box-sizing: border-box;
  border-radius: 10px;
`
export const WrapperInput = styled(Input)`
  &::placeholder {
    color: ${props => props.theme.colors.secondary[3]};
  }
  color: ${props => props.theme.colors.secondary[1]};
  font-weight: normal;
  font-style: normal;
  border: 0px;
`
export const WrapperAddon = styled(InputGroup.Addon)``
export const WrapperButton = styled(InputGroup.Button)``
