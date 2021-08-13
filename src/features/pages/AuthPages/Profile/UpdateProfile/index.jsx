import { BaseButton, BaseIcon } from 'atoms'
import { EndPoint } from 'config/api'
import { useAlert, useRequestManager, useToken } from 'hooks'
import { AvatarBlock, InputBlock } from 'molecules/ProfileChange'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { globalUserState } from 'stores/profile/atom'
import { Constant } from 'utils'
import { modifyPropsOfState, trimStringFieldOfObject } from 'utils/Helpers'
import Routers from 'utils/Routers'
import { ColWrapper, ContainerWrapper, FormWrapper } from '../styled'
import validateModel from './validateModel'

const UpdateProfile = ({ ...others }) => {
  const [userState, setUserState] = useRecoilState(globalUserState)
  const { clearToken } = useToken()
  const { onPatchExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])

  const [data, setData] = useState({
    email: userState.email,
    firstName: userState.firstName,
    lastName: userState.lastName,
    phone: userState.phone
  })
  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })

  const handleUpdateProfile = async () => {
    
    const submitData = {
      ...trimStringFieldOfObject(data),
      status: Constant.Status[0].value
    }
    const response = await onPatchExecute(
      `${EndPoint.UPDATE_STAFFS}/${userState.sub}`,
      submitData
    )
    if (response) {
      setUserState({})
      await clearToken()
      showSuccess('Update Successfully')
      goToPage(Routers.LOGIN)
    }
  }

  const handleInput = useCallback(
    (name, value) => {
      modifyPropsOfState(error, setError, name, '')
      modifyPropsOfState(data, setData, name, value)
    },
    [data]
  )

  const validateData = useCallback(err => {
    let newError = { ...error }
    for (const [key, value] of Object.entries(err)) {
      newError[key] = value
    }
    setError(newError)
  }, [])

  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <FormWrapper
          formValue={data}
          model={validateModel}
          onCheck={validateData}
          onSubmit={handleUpdateProfile}
        >
          <AvatarBlock disable={true} />

          <InputBlock
            title='First Name'
            placeholder='First Name'
            onChange={value => handleInput('firstName', value)}
            value={data['firstName']}
            helpText={error['firstName']}
            isError={!error['firstName'] ? false : true}
          />
          <InputBlock
            title='Last Name'
            placeholder='Last Name'
            onChange={value => handleInput('lastName', value)}
            value={data['lastName']}
            helpText={error['lastName']}
            isError={!error['lastName'] ? false : true}
          />
          <InputBlock
            disabled={true}
            title='Email'
            placeholder='Email'
            RightSide={{
              onClick: null,
              icon: <BaseIcon icon='info' />
            }}
            onChange={value => handleInput('email', value)}
            value={data['email']}
            helpText={error['email']}
            isError={!error['email'] ? false : true}
          />
          <InputBlock
            title='Phone'
            placeholder='Phone'
            onChange={value => handleInput('phone', value)}
            value={data['phone']}
            helpText={error['phone']}
            isError={!error['phone'] ? false : true}
          />

          <ContainerWrapper justify='space-around'>
            <ColWrapper colspan={8}>
              <BaseButton
                secondary
                bold
                onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.URL)}
              >
                Cancel
              </BaseButton>
            </ColWrapper>
            <ColWrapper colspan={12}>
              <BaseButton type='submit' primary bold>
                Update profile
              </BaseButton>
            </ColWrapper>
          </ContainerWrapper>
        </FormWrapper>
      </ColWrapper>
    </ContainerWrapper>
  )
}

UpdateProfile.propTypes = {
  children: PropTypes.node
}

export default React.memo(UpdateProfile)
