import styled from 'styled-components'
import { FormGroup, ControlLabel, FormControl, InputGroup, Icon } from 'rsuite'
import { BaseText } from 'atoms'

export const Wrapper = styled(FormGroup)``

export const Label = styled(ControlLabel)`
  ${props =>
    props.bold &&
    `font-weight: 700 ;
    margin: 20px 0 ;`};
  display: flex !important;
`
export const Control = styled(FormControl)`
  border-radius: 10px !important;
  height: max-content;
  align-item: center;
  padding: 7px 10px;
  text-overflow: ellipsis; /* IE, Safari (WebKit) */
  overflow: hidden; /* don't show excess chars */
  white-space: nowrap;
  outline: none;
  &.rs-input[disabled] {
    cursor: not-allowed;
    color: unset;
    background: unset;
  }
`
export const Input = styled(InputGroup)`
  overflow: visible;
  display: flex;
  align-items: center;
  border: 1px solid #e5e5ea;
  border-radius: 10px;
  outline: none;
`

export const InputAddon = styled(Input.Addon)`
  display: flex;
  align-items: center;
  width: max-content;
  margin: 0;
  padding: 8px;
  border-radius: 10px !important;
  outline: none;
  background: ${props => props.theme.colors.background[0]};
`
export const TextRequire = styled(BaseText)`
  color: ${props => props.theme.colors.error};
  margin-left: 10px;
`

export const IconContainer = styled(Icon)``
