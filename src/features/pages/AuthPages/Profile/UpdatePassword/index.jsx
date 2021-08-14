import { useAlert, useRequestManager } from 'hooks'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { modifyPropsOfState } from 'utils/Helpers'
import Routers from 'utils/Routers'
import { EndPoint } from 'config/api'
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
  const [error, setError] = useState({
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
    }
  }

  const handleInput = useCallback(
    (name, value) => {
      modifyPropsOfState(error, setError, name, '')
      modifyPropsOfState(data, setData, name, value)
    },
    [data]
  )
  const validateData = useCallback(
    err => {
      let newError = { ...error }
      if (data['cfPassword'] !== data['password']) {
        newError['cfPassword'] = 'Confirm password is not match password'
      }
      for (const [key, value] of Object.entries(err)) {
        newError[key] = value
      }
      setError(newError)
    },
    [error]
  )

  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <FormWrapper
          formValue={data}
          model={validateModel}
          onCheck={validateData}
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
            helpText={error['oldPassword']}
            isError={!error['oldPassword'] ? false : true}
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
            helpText={error['password']}
            isError={!error['password'] ? false : true}
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
            helpText={error['cfPassword']}
            isError={!error['cfPassword'] ? false : true}
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
              <Button
                type='submit'
                primary
                bold
                onSubmit={handleUpdatePassword}
              >
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
