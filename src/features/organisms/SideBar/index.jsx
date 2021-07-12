import React from 'react'
import {
  ContainerWrapper,
  LogoWrapper,
  MenuWrapper,
  UserWrapper,
  NavItems
} from './styled'
import PropTypes from 'prop-types'
import { ProfileBlock } from 'molecules'

const SideBar = ({ menuList, ...others }) => {
  return (
    <ContainerWrapper>
      <LogoWrapper></LogoWrapper>
      <MenuWrapper>
        {menuList.map((item, index) => (
          <NavItems key={index} strict={true} to={item.URL}>
            {item.NAME}
          </NavItems>
        ))}
      </MenuWrapper>
      <UserWrapper>
        <ProfileBlock></ProfileBlock>
      </UserWrapper>
    </ContainerWrapper>
  )
}

SideBar.propTypes = {
  children: PropTypes.node,
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      URL: PropTypes.string,
      NAME: PropTypes.string
    })
  )
}

export default React.memo(SideBar)
