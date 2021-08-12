/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { Wrapper, FormWrapper, ColWrapper, ContainerWrapper } from './styled'
import { BaseButton, BaseImage, BaseInputPicker } from 'atoms'
import { useRequestManager, useAlert } from 'hooks'
import { useTheme } from 'styled-components'
import { modifyPropsOfState, trimStringFieldOfObject } from 'utils/Helpers'
import { withNamespaces } from 'react-i18next'
import { PropTypes } from 'prop-types'
import { Routers } from 'utils'
import { IMAGES } from 'assets'
import { InputGroup } from 'molecules'
import { CreateAccountForm } from '../../../../molecules'

const CreateAccount = ({ t }) => {
  const theme = useTheme()
  const goToPage = useCallback(route => history.push(route), [])
  const { showSuccess } = useAlert()
  const { onGetExecute, onPatchExecute } = useRequestManager()
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })

  const handleUpdateProfile = () => {
    console.log('update', data)
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

  //mock
  const pickerData = [
    {
      value: '1',
      label: '四川'
    },
    {
      value: '2',
      label: '四川'
    }
  ]
  return (
    <Wrapper>
      <ColWrapper>
        <CreateAccountForm />
        {/* <FormWrapper
          formValue={data}
          model={validateModel}
          onCheck={validateData}
          onSubmit={handleUpdateProfile}
        >
          <InputGroup
            placeholder='First Name'
            onChange={value => handleInput('firstName', value)}
            value={data['firstName']}
            helpText={error['firstName']}
            isError={!error['firstName'] ? false : true}
            LeftSide={<BaseImage source={IMAGES.LOGO.USER} />}
          />
          <InputGroup
            placeholder='Last Name'
            onChange={value => handleInput('lastName', value)}
            value={data['lastName']}
            helpText={error['lastName']}
            isError={!error['lastName'] ? false : true}
            LeftSide={<BaseImage source={IMAGES.LOGO.USER} />}
          />
          <InputGroup
            placeholder='Email'
            onChange={value => handleInput('email', value)}
            value={data['email']}
            helpText={error['email']}
            isError={!error['email'] ? false : true}
            LeftSide={<BaseImage source={IMAGES.LOGO.MAIL} />}
          />
          <InputGroup
            placeholder='Phone'
            onChange={value => handleInput('phone', value)}
            value={data['phone']}
            helpText={error['phone']}
            isError={!error['phone'] ? false : true}
            LeftSide={<BaseImage source={IMAGES.LOGO.PHONE} />}
          />
          <BaseInputPicker
            placeholder='Role'
            data={pickerData}
            style={{ width: '100%', marginBottom: 10 }}
          />

          <ContainerWrapper justify='space-around'>
            <ColWrapper colspan={8}>
              <BaseButton
                secondary
                bold
                onClick={() => goToPage(Routers.SUPER_ADMIN.PROFILE.URL)}
              >
                Cancel
              </BaseButton>
            </ColWrapper>
            <ColWrapper colspan={12}>
              <BaseButton
                type='submit'
                primary
                bold
                onClick={handleUpdateProfile}
              >
                Create Account
              </BaseButton>
            </ColWrapper>
          </ContainerWrapper>
        </FormWrapper> */}
      </ColWrapper>
    </Wrapper>
  )
}

CreateAccount.propTypes = {
  t: PropTypes.any
}

export default withNamespaces('menu')(CreateAccount)
