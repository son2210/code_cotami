import React, { useState, useCallback } from 'react'
import { Wrapper } from './styled'
import { UnAuthForm } from 'organisms'
import { BaseIcon } from 'atoms'
import { InputGroup } from 'molecules'
import validateModel from './validateModel'
import { modifyPropsOfState } from 'utils/Helpers'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import { useRequestManager, useToken } from 'hooks'
import { EndPoint } from 'config/api'

const Login = () => {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const { onPostExecute } = useRequestManager()
  const { saveToken } = useToken()

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const handleLogin = useCallback(async () => {
    const response = await onPostExecute(EndPoint.LOGIN_API, data, false)
    if (response) {
      await saveToken(response.accessToken)
      goToPage(Routers.NORMAL_ADMIN.MENU[0].URL)
    }
  }, [data])

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

  const goToPage = useCallback(route => history.push(route), [])

  return (
    <Wrapper column={true}>
      <UnAuthForm
        formTitle={'Login'}
        primaryBtn={{
          name: 'Login',
          onClick: handleLogin
        }}
        secondaryBtn={{
          name: 'Register',
          onClick: () => goToPage(Routers.REGISTER)
        }}
        tertiaryBtn={{
          name: 'Forgot Password?',
          onClick: () => goToPage(Routers.FORGOT_PASSWORD)
        }}
        formValue={data}
        model={validateModel}
        onCheck={validateData}
        onSubmit={handleLogin}
      >
        <InputGroup
          placeholder='Email'
          LeftSide={<BaseIcon icon='user' />}
          name='email'
          onChange={value => handleInput('email', value)}
          value={data['email']}
          helpText={error['email']}
          isError={!error['email'] ? false : true}
        />

        <InputGroup
          LeftSide={<BaseIcon icon='lock' />}
          RightSide={{
            onClick: () => setShowPassword(!showPassword),
            icon: <BaseIcon icon='eye' />
          }}
          placeholder='Password'
          type={showPassword ? 'text' : 'password'}
          name='password'
          onChange={value => handleInput('password', value)}
          value={data['password']}
          helpText={error['password']}
          isError={!error['password'] ? false : true}
        />
      </UnAuthForm>
    </Wrapper>
  )
}

export default Login
