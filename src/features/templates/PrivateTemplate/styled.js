import { Container, Header, Content, Footer, Sidebar } from 'rsuite'
import styled from 'styled-components'

const sidebarWidth = 260
const headerHeight = 10

export const ContainerWrapper = styled(Container)``

export const CenterWrapper = styled(Container)``

export const HeaderWrapper = styled(Header)`
  padding-top: 25px;
  // width: calc(100%-${sidebarWidth}px);
  margin-left: ${sidebarWidth}px;
  padding-left: 30px;
  margin-bottom: 30px;
  height: ${headerHeight}vh;
  position: fixed;
  top: 0;
  left: 0;
`

export const LeftSideBar = styled(Sidebar)`
  height: 100%;
  width: ${sidebarWidth}px;
  background: ${props => props.theme.colors.secondary[6]};
  position: fixed;
  top: 0;
  left: 0;
`

export const ContentWrapper = styled(Content)`
  display: flex;
  // width: calc(100%-${sidebarWidth}px);
  height: ${100 - headerHeight}vh;
  margin-left: ${sidebarWidth}px;
  margin-top: ${headerHeight}vh;
  padding-bottom:30px;
  padding-left: 30px;
  overflow: auto;
`

export const FooterWrapper = styled(Footer)`
  margin-top: 15px;
`
