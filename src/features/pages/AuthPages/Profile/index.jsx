import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Routers from 'utils/Routers'
import { DisplayField, AvatarBlock } from 'molecules/ProfileChange'
import { ContainerWrapper, ColWrapper } from './styled'
import { BaseButton } from 'atoms'
import { useHistory } from 'react-router-dom'

const Profile = ({ ...others }) => {
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])
  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <AvatarBlock hasUpload={false} />
        <DisplayField title={'Company id'} content={'B0001'} />
        <DisplayField title={'Company name'} content={'Its Global'} />
        <DisplayField title={'Role'} content={'staff'} />
        <DisplayField title={'First name'} content={'minakata'} />
        <DisplayField title={'Last Name'} content={'jin'} />
        <DisplayField title={'Email'} content={'jin@its-global.jp'} />
        <br />
        <BaseButton
          primary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[1].URL)}
        >
          Update profile
        </BaseButton>
        <BaseButton
          secondary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[0].URL)}
        >
          Change password
        </BaseButton>
        <BaseButton bold>Logout</BaseButton>
      </ColWrapper>
    </ContainerWrapper>
  )
}

Profile.propTypes = {
  children: PropTypes.node
}

export default React.memo(Profile)
