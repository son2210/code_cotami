import React from 'react'
import PropTypes from 'prop-types'
import {
  ContainerWrapper,
  AvatarWrapper,
  ButtonWrapper,
  UserWrapper
} from './styled'
import { BaseTitle } from 'atoms'
import { IMAGES } from 'assets'
import { useHistory } from 'react-router-dom'
import Routers from 'utils/Routers'

const PrivateHeader = ({ imageUrl, name, role, onClick, ...others }) => {
  const history = useHistory()
  return (
    <ContainerWrapper
      onClick={() => history.push(Routers.NORMAL_ADMIN.PROFILE.URL)}
      {...others}
    >
      <AvatarWrapper source={IMAGES.AVATAR} />
      <UserWrapper>
        <BaseTitle bold h5>
          Sizuka
        </BaseTitle>
        <BaseTitle h6> admin</BaseTitle>
      </UserWrapper>
      <ButtonWrapper> {'>'} </ButtonWrapper>
    </ContainerWrapper>
  )
}

PrivateHeader.propTypes = {
  onClick: PropTypes.func,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string
}

export default React.memo(PrivateHeader)
