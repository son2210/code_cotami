import { EndPoint } from 'config/api'
import { useAlert, useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Routers from 'utils/Routers'
import {
  Button,
  ColWrapper,
  ContainerWrapper,
  FormWrapper,
  Icon,
  WrapperInputBlock
} from './styled'
import validateModel from './validateModel'

const UpdatePassword = ({ ...others }) => {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPasswordCf, setShowPasswordCf] = useState(false)
  const { onPostExecute } = useRequestManager()
  const goToPage = useCallback(route => history.push(route), [])
  const { showSuccess } = useAlert()
  const [data, setData] = useState({
    oldPassword: '',
    password: '',
    cfPassword: ''
  })

  const handleUpdatePassword = async () => {
    const submitData = {
      oldPassword: data.oldPassword,
      newPassword: data.cfPassword
    }
    const response = await onPostExecute(
      `${EndPoint.RESET_PASSWORD}`,
      submitData
    )
    if (response) {
      showSuccess('Change Password Successfully')
      goToPage(Routers.NORMAL_ADMIN.PROFILE.URL)
    }
  }

  const handleInput = useCallback(
    (name, value) => {
      setData(prev => ({ ...prev, [name]: value }))
    },
    [data]
  )

  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <FormWrapper
          formValue={data}
          model={validateModel}
          onSubmit={handleUpdatePassword}
        >
          <WrapperInputBlock
            label='Old password'
            name='oldPassword'
            onChange={value => handleInput('oldPassword', value)}
            type={showOldPassword ? 'text' : 'password'}
            rightIcon={{
              click: () => setShowOldPassword(!showOldPassword),
              icon: showOldPassword ? (
                <Icon name='feather-eye-off' size={18} />
              ) : (
                <Icon name='feather-eye' size={18} />
              )
            }}
            placeholder='Old Password'
            value={data['oldPassword']}
          />

          <WrapperInputBlock
            label='Password'
            name='password'
            onChange={value => handleInput('password', value)}
            type={showPassword ? 'text' : 'password'}
            rightIcon={{
              click: () => setShowPassword(!showPassword),
              icon: showPassword ? (
                <Icon name='feather-eye-off' size={18} />
              ) : (
                <Icon name='feather-eye' size={18} />
              )
            }}
            placeholder='Password'
            value={data['password']}
          />

          <WrapperInputBlock
            label='Old password'
            name='cfPassword'
            onChange={value => handleInput('cfPassword', value)}
            type={showPasswordCf ? 'text' : 'password'}
            rightIcon={{
              click: () => setShowPasswordCf(!showPasswordCf),
              icon: showPasswordCf ? (
                <Icon name='feather-eye-off' size={18} />
              ) : (
                <Icon name='feather-eye' size={18} />
              )
            }}
            placeholder='Confirm Password'
            value={data['cfPassword']}
          />

          <ContainerWrapper justify='space-around'>
            <ColWrapper colspan={8}>
              <Button
                secondary
                bold
                onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.URL)}
              >
                Cancel
              </Button>
            </ColWrapper>
            <ColWrapper colspan={12}>
              <Button type='submit' primary bold>
                Update Password
              </Button>
            </ColWrapper>
          </ContainerWrapper>
        </FormWrapper>
      </ColWrapper>
    </ContainerWrapper>
  )
}

UpdatePassword.propTypes = {
  children: PropTypes.node
}

export default React.memo(UpdatePassword)
