import { BaseButton, BaseIcon } from 'atoms'
import { EndPoint } from 'config/api'
import { useAlert, useRequestManager } from 'hooks'
import { AvatarBlock } from 'molecules/ProfileChange'
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { globalUserState } from 'stores/profile/atom'
import { Routers } from 'utils'
import {
  ColWrapper,
  ContainerWrapper,
  FormWrapper,
  InputBlock
} from '../styled'
import validateModel from './validateModel'

const UpdateProfile = ({ ...others }) => {
  const [userState, setUserState] = useRecoilState(globalUserState)
  const { onPatchExecute } = useRequestManager()
  const { showSuccess } = useAlert()
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])

  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })

  const handleUpdateProfile = useCallback(() => {
    async function execute() {
      const response = await onPatchExecute(
        `${EndPoint.UPDATE_STAFFS}/${userState.sub}`,
        data
      )
      if (response) {
        showSuccess('Update Successfully')
        setUserState({ ...userState, ...response })
        goToPage(Routers.NORMAL_ADMIN.PROFILE.URL)
      }
    }
    execute()
  }, [data])

  const handleInput = useCallback(
    (name, value) => {
      setData(prev => ({ ...prev, [name]: value }))
    },
    [data]
  )

  useEffect(() => {
    setData({
      email: userState.email,
      firstName: userState.firstName,
      lastName: userState.lastName,
      phone: userState.phone
    })
  }, [globalUserState])

  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <FormWrapper
          formValue={data}
          model={validateModel}
          onSubmit={handleUpdateProfile}
        >
          <AvatarBlock disable={true} />

          <InputBlock
            label='First Name'
            placeholder='First Name'
            name='firstName'
            onChange={value => handleInput('firstName', value)}
            value={data['firstName']}
          />
          <InputBlock
            label='Last Name'
            placeholder='Last Name'
            name='lastName'
            onChange={value => handleInput('lastName', value)}
            value={data['lastName']}
          />
          <InputBlock
            disabled={true}
            label='Email'
            name='email'
            placeholder='Email'
            rightIcon={{
              onClick: null,
              icon: <BaseIcon icon='info' />
            }}
            onChange={value => handleInput('email', value)}
            value={data['email']}
          />
          <InputBlock
            label='Phone'
            placeholder='Phone'
            name='phone'
            onChange={value => handleInput('phone', value)}
            value={data['phone']}
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
