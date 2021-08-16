import styled from 'styled-components'

import {
  BaseItemGrid,
  BaseWrapper,
  BaseTitle,
  BaseToggle,
  BaseForm,
  BaseTextArea
} from 'atoms'
import { FlexboxGrid } from 'rsuite'
import { InputBlock } from 'molecules/ProfileChange'

export const FlexGridWrapper = styled(FlexboxGrid)`
  flex: 1;
`
export const TextTitle = styled(BaseTitle)`
  font-size: 20px;
  font-weight: 700;
  line-height: 23.44px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 15px;
`
export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
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
export const TextWrapper = styled(BaseTitle)``
export const ButtonGroup = styled(BaseWrapper)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-left: 20px;
`
export const BaseTextAreaInput = styled(BaseTextArea)`
  margin: 0px 0px;
`
export const RowWrapper = styled(FlexboxGrid.Item)`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  .fLskbw {
    margin-top: 0px !important;
    margin-bottom: 10px !important;
  }
`
