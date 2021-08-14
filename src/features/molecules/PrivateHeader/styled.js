import { Link } from 'react-router-dom'
import { Breadcrumb } from 'rsuite'
import styled from 'styled-components'
export const ContainerWrapper = styled.div``
export const BreadItemWrapper = styled(Link)`
  color: ${props => props.theme.colors.secondary[3]};
  &.active {
    color: ${props => props.theme.colors.secondary[2]};
  }
`
export const BreadWrapper = styled(Breadcrumb)`
  display: flex;
  margin: 0;
  color: ${props => props.theme.colors.secondary[3]};
  & li,
  a {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
`
