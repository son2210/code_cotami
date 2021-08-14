import styled from 'styled-components'
import { BaseItemGrid, BaseButton, BaseForm } from 'atoms'
import { FlexboxGrid } from 'rsuite'

export const ContainerWrapper = styled(FlexboxGrid)`
  flex: 1;
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
`

export const ButtonWrapper = styled.div`
  display: flex;
`
export const Break = styled.br``
export const Button = styled(BaseButton)``

export const FormWrapper = styled(BaseForm)`
  .dWbTQq {
    font-weight:500;
    font-size:16px;
    color:#333333;
  }
`
