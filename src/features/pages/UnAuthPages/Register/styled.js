import styled from 'styled-components'
import {
  BaseWrapper,
  BaseItemGrid,
  BaseForm,
  BaseIcon,
  BaseButton,
  BaseTitle
} from 'atoms'
import { CustomInput, DynamicTag } from 'molecules'
import { FlexboxGrid } from 'rsuite'

export const WrapperRowInput = styled.div`
  display: flex;
  justify-content: space-between;
  & > .rs-form-group {
    width: 48%;
  }
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
  width: 48%;
  @media screen and (max-width: 670px) {
    width: 100%;
    margin: 20px auto;
  }
`
export const FomRegister = styled(BaseForm)``

export const FlexGridWrapper = styled(FlexboxGrid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
export const Icon = styled(BaseIcon)``
export const InputGroup = styled(CustomInput)``
export const Button = styled(BaseButton)``
export const ButtonGroup = styled(BaseWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 100px auto 40px;
  & > button {
    width: 48%;
  }
`

export const Wrapper = styled(BaseItemGrid)`
  flex: 1;
  display: flex;
  margin-top: 5vh;
`
export const Title = styled(BaseTitle)`
  margin: 40px 0;
`
export const CategoryTag = styled(DynamicTag)``
