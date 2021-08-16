import styled from 'styled-components'
import { BaseWrapper, BaseItemGrid } from 'atoms'
import { RadioForm } from 'molecules'
export const Wrapper = styled(BaseWrapper)``

export const RadioFormWrapper = styled(RadioForm)`
  display: flex;
  justify-content: center;
`

export const GridItem = styled(BaseItemGrid)`
  flex: 1;
  display: flex;
  margin-top: 5vh;
`
