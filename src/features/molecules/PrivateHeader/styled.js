import styled, { css } from 'styled-components'
import { Breadcrumb } from 'rsuite'
import { Link } from 'react-router-dom'
export const ContainerWrapper = styled.div``
export const BreadItemWrapper = styled(Link)`
  color: ${props => props.theme.colors.secondary[3]};
  &.active {
    color: ${props => props.theme.colors.secondary[2]};
  }
`
export const BreadWrapper = styled(Breadcrumb)`
  display: flex;
  padding-left: 0px;
  color: ${props => props.theme.colors.secondary[3]};
  & li, a  {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
    }
  
`
