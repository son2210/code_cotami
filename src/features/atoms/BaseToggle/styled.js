import styled, { css } from 'styled-components'
import { Toggle } from 'rsuite'

export const Wrapper = styled(Toggle)`
  &.rs-btn-toggle-checked {
    background: ${props => props.theme.colors.status[1]};
  }
`
