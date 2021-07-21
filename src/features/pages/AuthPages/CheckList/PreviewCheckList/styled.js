import styled, { css } from 'styled-components'
import { BaseTitle, BaseButton, BaseIcon } from 'atoms'
import { StepProgress } from 'molecules'
import { Progress } from 'rsuite'

export const Wrapper = styled.div`
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
  position: relative;
`
export const Title = styled(BaseTitle)``
export const LineProgress = styled(Progress.Line)``
export const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  ${props =>
    props.next &&
    css`
       {
        position: absolute;
        right: 10px;
      }
    `};

  ${props =>
    props.finish &&
    css`
       {
        padding: 2px 10px;
      }
    `};
`
export const WrapperProgress = styled(StepProgress)``
export const WrapperFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.secondary[6]};

  border-radius: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`
export const Icon = styled(BaseIcon)``
