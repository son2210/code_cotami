import React, { useState, useEffect } from 'react'
import {
  ContainerWrapper,
  LogoWrapper,
  MenuWrapper,
  UserWrapper,
  NavItems
} from './styled'
import PropTypes from 'prop-types'
import { ProfileBlock } from 'molecules'
import { useRecoilValue } from 'recoil'
import { globalUserState } from 'stores/profile/atom'
import { withNamespaces } from 'react-i18next'
import { withEmpty } from 'exp-value'

const SideBar = ({ t, menuList, ...others }) => {
  const [newMenuList, setNewMenuList] = useState(menuList)
  const userState = useRecoilValue(globalUserState)
  useEffect(() => {
    if (withEmpty('role', userState) === 'agency') {
      setNewMenuList(
        menuList.filter(item => withEmpty('NAME', item) !== 'staff-management')
      )
      return
    }

    setNewMenuList(
      menuList.filter(item => withEmpty('NAME', item) !== 'account-management')
    )
  }, [userState.role])

  return (
    <ContainerWrapper {...others}>
      <LogoWrapper></LogoWrapper>
      <MenuWrapper>
        {newMenuList.map((item, index) => (
          <NavItems key={index} strict={true} to={item.URL}>
            {t(item.NAME)}
          </NavItems>
        ))}
      </MenuWrapper>
      <UserWrapper>
        <ProfileBlock
          name={[
            withEmpty('firstName', userState),
            withEmpty('lastName', userState)
          ].join(' ')}
          role={t(withEmpty('role', userState))}
        />
      </UserWrapper>
    </ContainerWrapper>
  )
}

SideBar.propTypes = {
  children: PropTypes.node,
  t: PropTypes.any,
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      URL: PropTypes.string,
      NAME: PropTypes.string
    })
  )
}

export default withNamespaces('menu')(React.memo(SideBar))
