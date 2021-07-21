import styled, { css } from 'styled-components'
import { BaseTitle, BaseButton, BaseIcon } from 'atoms'

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`
export const Module = styled.div`
  border: 2px solid ${props => props.theme.colors.secondary[6]};
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  margin: 20px auto;
`
export const Title = styled(BaseTitle)``

export const WrapperTop = styled.div``
export const WrapperContent = styled.div``
export const ButtonCreateSection = styled(BaseButton)`
  width: 100%;
  padding: 40px;
  display: block;
  text-align: center;
  background: ${props => props.theme.colors.background[0]};
`
export const Icon = styled(BaseIcon)``
export const ContainerSection = styled.div``
export const IconRemoveModule = styled(BaseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
`
export const SectionCount = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${props => props.theme.colors.tertiary};
  align-items: center;
  margin-bottom: -15px;
`
export const Collapse = styled.div`
  display: block;
  transition: ease-in 1s;
  height: auto;
  ${props =>
    props.collapse &&
    css`
      height: 0;
    `}
`
