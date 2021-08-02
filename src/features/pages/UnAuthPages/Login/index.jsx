import React, { useState, useCallback } from 'react'
import { Wrapper } from './styled'
import { UnAuthForm } from 'organisms'
import { BaseImage } from 'atoms'
import { InputGroup } from 'molecules'
import validateModel from './validateModel'
import { modifyPropsOfState } from 'utils/Helpers'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import { useRequestManager, useToken } from 'hooks'
import { EndPoint } from 'config/api'
import { IMAGES } from 'assets'

const Login = () => {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const { onPostExecute } = useRequestManager()
  const { saveToken } = useToken()

  const [data, setData] = useState({
    enterpriseId: '', //18
    loginId: '', //aaa34i73
    password: '' //123123
  })
  const [error, setError] = useState({
    enterpriseId: '',
    loginId: '',
    password: ''
  })

  const handleLogin = useCallback(async () => {
    const response = await onPostExecute(EndPoint.LOGIN_API, data, false)
    if (response) {
      await saveToken(response.accessToken)
      goToPage(Routers.NORMAL_ADMIN.MENU[0].URL)
    } else {
      //  prevent  block resubmit
      setData({ ...data })
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
          placeholder='Company Id'
          LeftSide={<BaseImage source={IMAGES.LOGO.COMPANY} />}
          name='enterpriseId'
          onChange={value => handleInput('enterpriseId', value)}
          value={data['enterpriseId']}
          helpText={error['enterpriseId']}
          isError={!error['enterpriseId'] ? false : true}
        />
        <InputGroup
          placeholder='userId'
          LeftSide={<BaseImage source={IMAGES.LOGO.USER} />}
          name='loginId'
          onChange={value => handleInput('loginId', value)}
          value={data['loginId']}
          helpText={error['loginId']}
          isError={!error['loginId'] ? false : true}
        />

        <InputGroup
          LeftSide={<BaseImage source={IMAGES.LOGO.LOCK} />}
          RightSide={{
            onClick: () => setShowPassword(!showPassword),
            icon: <BaseImage source={IMAGES.EYE} />
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
