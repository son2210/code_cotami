import React, { useState, useCallback } from 'react'

import {
  Wrapper,
  FormCreater,
  FlexGridWrapper,
  ColWrapper,
  Title,
  InputGroup,
  InputPickerWrapper,
  CategoryTag
} from './styled'

import { withNull, withEmpty, withArray } from 'exp-value'

const AccountCreate = () => {
  const accTypes = [
    { value: 'staff', label: 'Staff' },
    { value: 'admin', label: 'Admin' },
    { value: 'agency', label: 'Agency' }
  ]

  const [data, setData] = useState({
    accountType: 'staff'
  })

  const onHandleInput = useCallback(
    (key, value) => {
      setData(current => ({ ...current, [key]: value }))
    },
    [data]
  )

  const renderTextInput = useCallback(
    ({ inputType, label, key, placeholder, showPassword }) => {
      const type =
        inputType === 'password'
          ? showPassword
            ? 'text'
            : inputType
          : showPassword
          ? 'text'
          : inputType

      return (
        <ColWrapper>
          <InputGroup
            label={label || ''}
            name={key}
            placeholder={placeholder || ''}
            onChange={value => onHandleInput(key, value)}
            value={withEmpty(`${key}`, data)}
            type={type || 'text'}
          />
        </ColWrapper>
      )
    }
  )

  const renderAccountType = useCallback(() => {
    return (
      <FlexGridWrapper>
        <ColWrapper>
          <Title H5 bold marginBottom={10}>
            Account Type
          </Title>
          <InputPickerWrapper
            label='Account Type'
            name='accountType'
            placeholder='Enter UserId'
            data={accTypes}
            onChange={value => onHandleInput('accountType', value)}
            value={withEmpty('accountType', data)}
            cleanable={false}
          />
        </ColWrapper>
      </FlexGridWrapper>
    )
  }, [accTypes, onHandleInput, data, withEmpty])

  const renderAccountInfo = useCallback(() => {
    const isStaff = withNull('accountType', data) === 'staff'
    return (
      <>
        <Title H2 bold>
          Account Infomation
        </Title>
        <FlexGridWrapper>
          {renderTextInput({
            label: 'UserId',
            key: 'userId',
            placeholder: 'Enter UserId'
          })}
          {renderTextInput({
            label: 'Email',
            key: 'email',
            placeholder: 'Enter Email'
          })}
          {renderTextInput({
            label: 'First name',
            key: 'firstName',
            placeholder: 'First name'
          })}
          {renderTextInput({
            label: 'Last name',
            key: 'lastName',
            placeholder: 'Last name'
          })}
          {renderTextInput({
            label: 'Password',
            key: 'password',
            placeholder: 'Enter Password',
            inputType: 'password'
          })}
          {renderTextInput({
            label: 'Confirm Password',
            key: 'cfPassword',
            placeholder: 'Confirm Password',
            inputType: 'password'
          })}
          {renderTextInput({
            label: 'Phone',
            key: 'phone',
            placeholder: 'Enter Phone number'
          })}
          {isStaff &&
            renderTextInput({
              label: 'Role',
              key: 'role',
              placeholder: 'Enter Role'
            })}
        </FlexGridWrapper>
        {isStaff && (
          <InputGroup
            label={'Note'}
            name={'note'}
            placeholder={'Enter Note'}
            onChange={value => onHandleInput('note', value)}
            value={withEmpty('note', data)}
            componentClass='textarea'
          />
        )}
      </>
    )
  })

  const renderEnterpriseInfo = useCallback(() => {
    const isStaff = withNull('accountType', data) === 'staff'
    const isAdmin = withNull('accountType', data) === 'admin'
    return (
      <>
        <Title H2 bold>
          Enterprise Infomation
        </Title>
        <FlexGridWrapper>
          {renderTextInput({
            label: 'Enterprise ID',
            key: 'enterpriseId',
            placeholder: 'Enter Enterprise ID'
          })}
          {isStaff &&
            renderTextInput({
              label: 'Unit',
              key: 'unit',
              placeholder: 'Enter Unit'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Enterprise Name',
              key: 'enterpriseName',
              placeholder: 'Enter Enterprise Name'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Business category',
              key: 'businessCategory',
              placeholder: 'Enter Business category'
            })}
          {isAdmin && (
            <ColWrapper>
              <CategoryTag
                label='Business category tag'
                name='businessCategoryTags'
                onChange={value => onHandleInput('businessCategoryTags', value)}
                value={withArray('businessCategoryTags', data)}
              />
            </ColWrapper>
          )}
          {isAdmin &&
            renderTextInput({
              label: 'Website',
              key: 'website',
              placeholder: 'Enter Website Url'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Phone',
              key: 'phone',
              placeholder: 'Enter Phone Number'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Province',
              key: 'province',
              placeholder: 'Enter Province'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Area',
              key: 'area',
              placeholder: 'Enter Area'
            })}
          {isAdmin &&
            renderTextInput({
              label: 'Street,/ Building no.',
              key: 'street',
              placeholder: 'Enter Street,/ Building no.'
            })}
        </FlexGridWrapper>
      </>
    )
  })

  return (
    <Wrapper>
      <FormCreater
        formValue={data}
        // model={validateRegister}
        // onSubmit={onSubmit}
      >
        {renderAccountType()}
        {renderAccountInfo()}
        {renderEnterpriseInfo()}
      </FormCreater>
    </Wrapper>
  )
}

export default AccountCreate
