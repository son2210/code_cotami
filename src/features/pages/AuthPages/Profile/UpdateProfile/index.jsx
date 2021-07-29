import React, { useCallback, useState } from 'react'
import { ContainerWrapper, ColWrapper, FormWrapper } from '../styled'
import PropTypes from 'prop-types'
import { AvatarBlock, InputBlock } from 'molecules/ProfileChange'
import { useHistory } from 'react-router-dom'
import { BaseButton, BaseIcon } from 'atoms'
import Routers from 'utils/Routers'
import { modifyPropsOfState } from 'utils/Helpers'
import validateModel from './validateModel'

const UpdateProfile = ({ ...others }) => {
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])
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
    //logout heare
    // setUserState({})
    // await clearToken()
    // goToPage(Routers.LOGIN)
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
          <AvatarBlock />

          <InputBlock
            title='First Name'
            placeholder='First Name'
            onChange={value => handleInput('firstName', value)}
            value={data['firstName']}
            helpText={error['lastName']}
            isError={!error['lastName'] ? false : true}
          />
          <InputBlock
            title='First Name'
            placeholder='Last Name'
            onChange={value => handleInput('lastName', value)}
            value={data['lastName']}
            helpText={error['firstName']}
            isError={!error['firstName'] ? false : true}
          />
          <InputBlock
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
              <BaseButton
                type='submit'
                primary
                bold
                onClick={handleUpdateProfile}
              >
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
