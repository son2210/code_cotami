import { BaseItemGrid, BaseText, BaseButton, BaseIcon, BaseLink } from 'atoms'
import styled, { css } from 'styled-components'
export const WrapperCol = styled.div`
  flex: 1;
  ${props =>
    props.floatRight &&
    css`
      text-align: right;
    `}
  ${props =>
    props.icon === 'chevron-right' &&
    css`
      display: flex;
      justify-content: flex-end;
    `}
`
export const WrapperColHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    margin-right: 10px;
  }
`
export const Wrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: col;
  padding-bottom: 10px;
  align-items: center;
  ${props =>
    !props.noneBorder &&
    css`
      border-bottom: 1px solid #f2f3f7;
    `}
  .bpPImK {
    justify-content: flex-end;
  }
  ${props =>
    !props.mg &&
    css`
      margin-top: 10px;
    `}
  ${props =>
    props.mgBottom &&
    css`
      margin-bottom: ${props.mgBottom}px;
    `}
`
export const Text = styled(BaseText)`
  ${props => {
    props.bold &&
      css`
      font-weight:500:
    `
  }}
`
export const WrapperButton = styled(BaseButton)`
  color:#FF814D;
  font-weight:500:
`
export const Icon = styled(BaseIcon)`
  ${props =>
    props.bold &&
    css`
      font-weight: 500;
    `}
`
export const Link = styled(BaseLink)``
