import React, { useState, useCallback } from 'react'
import {
  Wrapper,
  WrapperRowInput,
  ColWrapper,
  FomRegister,
  FlexGridWrapper,
  InputGroup,
  Icon,
  ButtonGroup,
  Button,
  Title,
  CategoryTag
} from './styled'

import validateRegister from './validate'
import { useHistory } from 'react-router-dom'
import { Routers } from 'utils'
import { useRequestManager, useAlert } from 'hooks'
import { EndPoint } from 'config/api'

const Register = () => {
  const { showSuccess } = useAlert()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCf, setShowPasswordCf] = useState(false)
  const { onPostExecute } = useRequestManager()
  const [data, setData] = useState({
    userId: '',
    password: '',
    cfPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enterpriseId: '',
    name: '',
    businessCategoryId: '',
    businessCategoryTags: [],
    province: '',
    area: '',
    address: '',
    website: '',
    enterprisePhone: '',
    enterpriseEmail: ''
  })

  const handleInput = useCallback(
    (name, value) => {
      setData(prev => ({ ...prev, [name]: value }))
    },
    [data]
  )

  const goToPage = useCallback(route => history.push(route), [])
  const onSubmit = useCallback(() => {
    const expData = {
      userId: data.userId,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      enterprise: {
        enterpriseId: data.enterpriseId,
        name: data.name,
        businessCategoryId: data.businessCategoryId,
        businessCategoryTags: data.businessCategoryTags,
        province: data.province,
        area: data.area,
        address: data.address,
        website: data.website,
        phone: data.enterprisePhone,
        email: data.enterpriseEmail
      }
    }
    async function handleRegister() {
      const response = await onPostExecute(
        EndPoint.REGISTER_API,
        expData,
        false
      )
      if (response) {
        showSuccess('Register Successfully')
        goToPage(Routers.LOGIN)
      }
    }
    handleRegister()
  }, [data])

  return (
    <Wrapper xs={24} sm={16} md={16} lg={12}>
      <FomRegister
        formValue={data}
        model={validateRegister}
        onSubmit={onSubmit}
      >
        <FlexGridWrapper>
          <ColWrapper>
            <Title H2 bold>
              Account Infomation
            </Title>
            <InputGroup
              label='UserId'
              name='userId'
              placeholder='Enter UserId'
              onChange={value => handleInput('userId', value)}
              value={data['userId']}
            />
            <WrapperRowInput fluid>
              <InputGroup
                label='First name'
                name='firstName'
                placeholder='First Name'
                onChange={value => handleInput('firstName', value)}
                value={data['firstName']}
              />

              <InputGroup
                label='Last name'
                name='lastName'
                placeholder='Last Name'
                onChange={value => handleInput('lastName', value)}
                value={data['lastName']}
              />
            </WrapperRowInput>
            <InputGroup
              label='Password'
              name='password'
              onChange={value => handleInput('password', value)}
              leftIcon={<Icon size={18} name='feather-lock' />}
              rightIcon={{
                click: () => setShowPassword(!showPassword),
                icon: <Icon size={18} name='feather-eye' />
              }}
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              value={data['password']}
            />
            <InputGroup
              label='Confirm password'
              name='cfPassword'
              onChange={value => handleInput('cfPassword', value)}
              leftIcon={<Icon size={18} name='feather-lock' />}
              rightIcon={{
                click: () => setShowPasswordCf(!showPasswordCf),
                icon: <Icon size={18} name='feather-eye' />
              }}
              value={data['cfPassword']}
              placeholder='Confirm Password'
              type={showPasswordCf ? 'text' : 'password'}
            />

            <InputGroup
              label='Phone'
              placeholder='Enter phone'
              name='phone'
              onChange={value => handleInput('phone', value)}
              value={data['phone']}
            />
            <InputGroup
              label='Email'
              name='email'
              placeholder='Enter email'
              onChange={value => handleInput('email', value)}
              value={data['email']}
            />
          </ColWrapper>

          <ColWrapper>
            <Title H2 bold>
              Enterprise Infomation
            </Title>
            <InputGroup
              label='CompanyID'
              name='enterpriseId'
              placeholder='Company Name'
              onChange={value => handleInput('enterpriseId', value)}
              value={data['enterpriseId']}
            />
            <InputGroup
              label='Company name'
              name='name'
              placeholder='Enter companyID'
              onChange={value => handleInput('name', value)}
              value={data['name']}
            />

            <InputGroup
              label='Business category'
              placeholder='Enter Business category'
              name='businessCategoryId'
              onChange={value => handleInput('businessCategoryId', value)}
              value={data['businessCategoryId']}
            />
            <CategoryTag
              label='Business category tag'
              name='businessCategoryTags'
              onChange={value => handleInput('businessCategoryTags', value)}
              value={data['businessCategoryTags']}
            />
            <InputGroup
              label='Company Phone'
              placeholder='Enter phone'
              name='enterprisePhone'
              onChange={value => handleInput('enterprisePhone', value)}
              value={data['enterprisePhone']}
            />
            <InputGroup
              label='Company email'
              placeholder='Enter email'
              name='enterpriseEmail'
              onChange={value => handleInput('enterpriseEmail', value)}
              value={data['enterpriseEmail']}
            />
            <InputGroup
              label='Website'
              placeholder='Enter website'
              name='website'
              onChange={value => handleInput('website', value)}
              value={data['website']}
            />

            <WrapperRowInput fluid>
              <InputGroup
                label='Province'
                name='province'
                placeholder='Enter Province'
                onChange={value => handleInput('province', value)}
                value={data['province']}
              />

              <InputGroup
                label='Area'
                name='area'
                placeholder='Enter Area'
                onChange={value => handleInput('area', value)}
                value={data['area']}
              />
            </WrapperRowInput>

            <InputGroup
              label='Address'
              name='address'
              placeholder='Enter Address'
              onChange={value => handleInput('address', value)}
              value={data['address']}
            />
          </ColWrapper>
        </FlexGridWrapper>

        <ButtonGroup>
          <Button fluid uppercase bold onClick={() => goToPage(Routers.LOGIN)}>
            Login
          </Button>
          <Button bold uppercase primary type='submit' fluid>
            Register
          </Button>
        </ButtonGroup>
      </FomRegister>
    </Wrapper>
  )
}

export default Register
