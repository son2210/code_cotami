import styled from 'styled-components'
import { BaseWrapper, BaseImage } from 'atoms'

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.colors.white};
  margin-left: 10px;
  margin-right: 10px;
  height: 8vh;
  border-radius: 8px;
  padding: 10px;
  align-items: center;
  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 1px 1px #fffa;
  }
`

export const AvatarWrapper = styled(BaseImage)`
  height: 5vh;
  width: auto;
  border-radius: 50%;
`
export const UserWrapper = styled.div`
  flex-grow: 1;
  width:100%;
  margin-left:15px;
`

export const ButtonWrapper = styled(BaseWrapper)`
`
