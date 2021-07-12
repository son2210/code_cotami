import React, { useEffect, useState } from 'react'
import {
  ContainerWrapper,
  HeaderWrapper,
  LeftSideBar,
  FooterWrapper,
  ContentWrapper,
  CenterWrapper
} from './styled'
import PropTypes from 'prop-types'
import { SideBar } from 'organisms'
import { PrivateHeader } from 'molecules'

const PrivateTemplate = ({ menuList, children, ...others }) => {
  const [path, setPath] = useState([])
  useEffect(() => {
    const pathname = window.location.pathname
      .split('/')
      .filter(name => name !== '')
    setPath(pathname)
  }, [window.location.pathname])

  return (
    <ContainerWrapper>
      <LeftSideBar>
        <SideBar menuList={menuList} />
      </LeftSideBar>
      <CenterWrapper>
        <HeaderWrapper>
          <PrivateHeader paths={path} />
        </HeaderWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </CenterWrapper>
      <FooterWrapper />
    </ContainerWrapper>
  )
}
PrivateTemplate.propTypes = {
  children: PropTypes.any
}
export default React.memo(PrivateTemplate)
