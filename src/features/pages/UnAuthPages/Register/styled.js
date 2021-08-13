import styled from 'styled-components'
import { BaseWrapper, BaseItemGrid } from 'atoms'
import { UnAuthForm } from 'organisms'
import { FlexboxGrid } from 'rsuite'

export const Wrapper = styled(BaseWrapper)``

export const NameWrapper = styled.div`
  display: flex;
`

export const ColWrapper = styled(BaseItemGrid)`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`
export const FomRegister = styled(UnAuthForm)``

export const FlexGridWrapper = styled(FlexboxGrid)`
  flex: 1;
`
