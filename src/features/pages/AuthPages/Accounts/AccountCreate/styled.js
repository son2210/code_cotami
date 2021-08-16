import styled from 'styled-components'
import { BaseForm, BaseItemGrid, BaseTitle, BaseInputPicker } from 'atoms'
import { CustomInput, DynamicTag } from 'molecules'
import { FlexboxGrid } from 'rsuite'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  @media screen and (max-width: 1200px) {
    display: block;
  }
`

export const FormCreater = styled(BaseForm)``

export const FlexGridWrapper = styled(FlexboxGrid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {
    margin: 20px 10px;
  }
`

export const Title = styled(BaseTitle)`
  margin: ${({ marginBottom }) => `${marginBottom || 40}px 0`};
`

export const InputGroup = styled(CustomInput)``

export const InputPickerWrapper = styled(BaseInputPicker)``

export const CategoryTag = styled(DynamicTag)``
