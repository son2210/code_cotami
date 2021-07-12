import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Routers from 'utils/Routers'
import { ContainerWrapper, ColWrapper, FormWrapper } from '../styled'
import { InputBlock } from 'molecules/ProfileChange'
import { useHistory } from 'react-router-dom'
import { BaseButton, BaseIcon } from 'atoms'
import { modifyPropsOfState } from 'utils/Helpers'
import validateModel from './validateModel'

const UpdatePassword = ({ ...others }) => {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPasswordCf, setShowPasswordCf] = useState(false)
  const goToPage = useCallback(route => history.push(route), [])

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

  const handleUpdatePassword = () => {
    console.log('update', data)
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
    <ContainerWrapper justify='start'>
      <ColWrapper colspan={9}>
        <FormWrapper
          formValue={data}
          model={validateModel}
          onCheck={validateData}
          onSubmit={handleUpdatePassword}
        >
          <InputBlock
            title='Old password'
            onChange={value => handleInput('oldPassword', value)}
            RightSide={{
              onClick: () => setShowOldPassword(!showOldPassword),
              icon: <BaseIcon icon='eye' />
            }}
            placeholder='Old Password'
            type={showPassword ? 'text' : 'password'}
            value={data['oldPassword']}
            helpText={error['oldPassword']}
            isError={!error['oldPassword'] ? false : true}
          />

          <InputBlock
            title='New password'
            onChange={value => handleInput('password', value)}
            RightSide={{
              onClick: () => setShowPassword(!showPassword),
              icon: <BaseIcon icon='eye' />
            }}
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            value={data['password']}
            helpText={error['password']}
            isError={!error['password'] ? false : true}
          />

          <InputBlock
            title='Confirm password'
            onChange={value => handleInput('cfPassword', value)}
            RightSide={{
              onClick: () => setShowPasswordCf(!showPasswordCf),
              icon: <BaseIcon icon='eye' />
            }}
            value={data['cfPassword']}
            placeholder='Confirm Password'
            type={showPasswordCf ? 'text' : 'password'}
            helpText={error['cfPassword']}
            isError={!error['cfPassword'] ? false : true}
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
              <BaseButton
                type='submit'
                primary
                bold
                onClick={handleUpdatePassword}
              >
                Update Password
              </BaseButton>
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
