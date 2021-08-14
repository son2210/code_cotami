import styled, { css } from 'styled-components'
import { BaseImage, BaseButton, BaseWrapper, BaseTitle, BaseIcon } from 'atoms'

export const ContainerWrapper = styled(BaseWrapper)`
  justify-items: center;
  align-items: center;
  margin-top: -13px;
  justify-content: space-around;
`

export const IconWrapper = styled(BaseImage)`
  ${props =>
    props.btnIcon &&
    css`
      margin-right: 0;
    `}
  &:hover {
    cursor: pointer;
  }
`
export const Icon = styled(BaseIcon)``

export const ButtonWrapper = styled(BaseButton)``
export const Title = styled(BaseTitle)``
export const WrapperBlock = styled.div`
  display: flex;
  cursor: pointer;
  & i {
    margin-right: 5px;
  }
`
