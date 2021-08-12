import styled from 'styled-components'
import { BaseItemGrid, BaseForm } from 'atoms'
import { FlexboxGrid } from 'rsuite'

export const Wrapper = styled.div`
  flex: 1;
`
export const FormWrapper = styled(BaseForm)``

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
`

export const ContainerWrapper = styled(FlexboxGrid)`
  flex: 1;
`
