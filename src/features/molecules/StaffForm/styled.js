import styled from 'styled-components'

import {
  BaseItemGrid,
  BaseForm,
  BaseWrapper,
  BaseTitle,
  BaseToggle
} from 'atoms'
import { FlexboxGrid } from 'rsuite'
import { InputBlock } from 'molecules/ProfileChange'

export const FlexGridWrapper = styled(FlexboxGrid)`
  flex: 1;
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`
export const ContainerWrapper = styled(BaseForm)``

export const InputWrapper = styled(InputBlock)``

export const BlockFieldWrapper = styled(BaseWrapper)`
  margin-top: 10px;
  margin-bottom: 20px;
`
export const TitleWrapper = styled(BaseTitle)`
  margin-bottom: 10px;
`

export const ToggleWrapper = styled(BaseToggle)`
  width: 50px;
`
