import React, { useState, useCallback } from 'react'
import { Wrapper, GridItem } from './styled'
import { UnAuthForm } from 'organisms'
import { BaseIcon } from 'atoms'
import { InputGroup } from 'molecules'
import validateModel from './validateModel'
import { modifyPropsOfState } from 'utils/Helpers'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'

const ForgotPassword = () => {
  const history = useHistory()
  const [data, setData] = useState({
    email: ''
  })
  const [error, setError] = useState({
    email: ''
  })
  const handleForgotPassword = () => {
    console.log('submit data', data)
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

  const goToPage = useCallback(route => history.push(route), [])

  return (
    <GridItem xs={24} sm={16} md={12} lg={6}>
      <Wrapper>
        <UnAuthForm
          formTitle={'Forgot password'}
          primaryBtn={{
            name: 'Send',
            onClick: handleForgotPassword
          }}
          secondaryBtn={{
            name: 'Go back to Login Page',
            onClick: () => goToPage(Routers.LOGIN)
          }}
          formValue={data}
          model={validateModel}
          onCheck={validateData}
          onSubmit={handleForgotPassword}
        >
          <InputGroup
            placeholder='Email'
            LeftSide={<BaseIcon icon='envelope-o' />}
            name='email'
            onChange={value => handleInput('email', value)}
            value={data['email']}
            helpText={error['email']}
            isError={!error['email'] ? false : true}
          />
        </UnAuthForm>
      </Wrapper>
    </GridItem>
  )
}

export default ForgotPassword
