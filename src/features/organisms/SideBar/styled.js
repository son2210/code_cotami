import styled from 'styled-components'
import { BaseWrapper, BaseCotami } from 'atoms'
import { NavLink } from 'react-router-dom'

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5vh;
  margin-top: 20px;
`

export const LogoWrapper = styled(BaseCotami)`
`

export const MenuWrapper = styled.div`
  flex-grow: 1;
  padding-top: 40px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
`

export const NavItems = styled(NavLink)`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.secondary[2]};
  text-decoration: none;
  &.active {
    color: ${props => props.theme.colors.primary};
  }
  &:focus {
    text-decoration: none;
  }
  &:hover {
    border-radius: 10px;
    text-decoration: none;
  }
`

export const UserWrapper = styled.div`
  height:50px,
  width:100%,
`
