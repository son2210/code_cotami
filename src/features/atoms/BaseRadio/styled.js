import styled, { css } from 'styled-components'
import { Radio } from 'rsuite'

export const Wrapper = styled(Radio)`
  & label .rs-radio-wrapper .rs-radio-inner::before  {
    background:${props => props.theme.colors.secondary[6]};
    // border: 0px;
  }
  &.rs-radio-checked .rs-radio-wrapper .rs-radio-inner {
    &::before{
      // background:${props => props.theme.colors.primary};
      border-color:${props => props.theme.colors.secondary[5]};
      border: 0px;
    }
    &::after{
      background:${props => props.theme.colors.primary};
    }
  }

`
