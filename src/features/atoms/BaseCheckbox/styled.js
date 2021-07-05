import styled from 'styled-components'
import { Checkbox } from 'rsuite'

export const WrapperCheckbox = styled(Checkbox)`
  &.rs-checkbox .rs-checkbox-checker .rs-checkbox-wrapper:hover {
    box-shadow: 1px 1px 6px 2px ${props => props.theme.colors.primary};
    &.rs-checkbox-inner {
      border-color: ${props => props.theme.colors.primary};
    }
  }
  &.rs-checkbox-checked .rs-checkbox-wrapper .rs-checkbox-inner {
    &::before {
      background: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
    }
    &::after {
      background: ${props => props.theme.colors.primary};
    }
  }
`
