import { withEmpty } from 'exp-value'
import { useToken } from 'hooks'
import { AvatarBlock, DisplayField } from 'molecules/ProfileChange'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { globalUserState } from 'stores/profile/atom'
import Routers from 'utils/Routers'
import Payment from './Payment'
import { Break, Button, ColWrapper, ContainerWrapper } from './styled'

const Profile = ({ ...others }) => {
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])
  const [userState, setUserState] = useRecoilState(globalUserState)
  const { clearToken } = useToken()

  const [data, setData] = useState(userState)

  useEffect(() => {
    setData(userState)
  }, [globalUserState])

  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper xs={24} sm={16} md={16} lg={8}>
        <AvatarBlock hasUpload={false} disable={true} />
        <DisplayField
          title={'Company id'}
          content={withEmpty('companyId', data)}
        />
        <DisplayField
          title={'Company name'}
          content={withEmpty('name', data)}
        />
        <DisplayField title={'Role'} content={withEmpty('role', data)} />
        <DisplayField
          title={'First name'}
          content={withEmpty('firstName', data)}
        />
        <DisplayField
          title={'Last Name'}
          content={withEmpty('lastName', data)}
        />
        <DisplayField title={'Email'} content={withEmpty('email', data)} />
        <Break />
        <Button
          primary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[1].URL)}
        >
          Update profile
        </Button>
        <Button
          secondary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[0].URL)}
        >
          Change password
        </Button>
        <Button
          bold
          onClick={async () => {
            setUserState({})
            await clearToken()
            goToPage(Routers.LOGIN)
          }}
        >
          Logout
        </Button>
      </ColWrapper>
      <Payment />
    </ContainerWrapper>
  )
}

Profile.propTypes = {
  children: PropTypes.node
}

export default React.memo(Profile)
