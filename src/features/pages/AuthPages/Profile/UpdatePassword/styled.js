import styled from 'styled-components'
import { BaseItemGrid, BaseForm } from 'atoms'
import { FlexboxGrid } from 'rsuite'
import { BaseButton, BaseIcon } from 'atoms'
import { CustomInput } from 'molecules'
export const WrapperInputBlock = styled(CustomInput)`

`

export const Icon = styled(BaseIcon)``

export const Button = styled(BaseButton)``

export const ContainerWrapper = styled(FlexboxGrid)`
  flex: 1;
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
`

export const FormWrapper = styled(BaseForm)`
  .kvjAzv{
          color: #333333;
        font-weight:400;
        font-size:16px;
      }
`
