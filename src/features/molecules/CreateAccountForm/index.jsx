import React from 'react'
import PropTypes from 'prop-types'
import {
  ContainerWrapper,
  ColWrapper,
  BlockFieldWrapper,
  FlexGridWrapper,
  TitleWrapper,
  ToggleWrapper,
  ButtonGroup,
  TextTitle,
  BaseTextAreaInput,
  RowWrapper,
  TextWrapper
} from './styled'
import { BaseCheckPicker, BaseInputPicker, BaseButton } from 'atoms'
import { InputBlock } from 'molecules/ProfileChange'
import validateModel from './validateModel'
import { useCallback } from 'react'
import { useState } from 'react'

const CreateAccountForm = ({

}) => {

  const dataSelect = [
    {
      value: '1',
      label: '四川'
    },
    {
      value: '2',
      label: '四川'
    }
  ]
  const dataAccount = [
    {
      value: 1,
      label: 'System Admin'
    },
    {
      value: 2,
      label: 'Agency'
    }
  ]
  const [typeAccount, setTypeAccount] = useState(1);
  const onHandleSubmit = () => {
    console.log('submit form create')
  }

  const agencyForm = () => {
    return (
      <>
        <TextTitle>Agency Infomation</TextTitle>
        <FlexGridWrapper>
          <ColWrapper colspan={8} >
            <InputBlock
              title='Enterprise ID'
              placeholder='Enter enterprise ID'

            />
            <InputBlock
              title='Website'
              placeholder=''
            />
            <InputBlock
              title='Province'
              placeholde='Enter province'
            />
            <InputBlock
              title='Street,/ Building no.'
              placeholder='Enter Street,/ Building no.'
            />
          </ColWrapper>
          <ColWrapper colspan={8} >
            <InputBlock
              title='Enterprise name'
              placeholder='Enter enterprise name'

            />
            <InputBlock
              title='Phone'
              placeholder=''
            />
            <InputBlock
              title='Area'
              placeholde='Enter Area'
            />
          </ColWrapper>
        </FlexGridWrapper>
      </>
    )
  }
  const accountType = () => {
    return (
      <>
        <ColWrapper colspan={8}>
          <BlockFieldWrapper column={'column'} >
            <TitleWrapper>Account Type</TitleWrapper>
            <BaseInputPicker data={dataAccount} placeholder='System Admin' onChange={(value) => { setTypeAccount(value) }} />
          </BlockFieldWrapper>

        </ColWrapper>
      </>
    )
  }
  const accountInfomation = () => {
    return (
      <>
        <TextTitle>Account Infomation</TextTitle>
        <FlexGridWrapper>
          <ColWrapper colspan={8}>
            <InputBlock
              title='User ID'
              placeholder='abc123'

            />
            <InputBlock
              title='First Name'
              placeholder='First Name'
              name='firstName'
            />
            <InputBlock
              title='Password'
            />
            <InputBlock
              title='Phone'
              placeholder='Enter your phone'
            />
          </ColWrapper>
          <ColWrapper colspan={8}>
            <InputBlock
              title='Email'
              placeholder='xxx@gmail.com'

            />
            <InputBlock
              title='Last Name'
              placeholder='Last Name'
            />
            <InputBlock
              title='Confirm Password'
            />
            <BlockFieldWrapper column={'column'}>
              <TitleWrapper>Role</TitleWrapper>
              <BaseInputPicker data={dataSelect} placeholder='Status' />
            </BlockFieldWrapper>
          </ColWrapper>
        </FlexGridWrapper>
      </>
    )
  }
  return (
    <ContainerWrapper
      model={validateModel}
      onSubmit={onHandleSubmit}
    >

      {accountType()}
      {accountInfomation()}
      <FlexGridWrapper>
        <RowWrapper colspan={16}>
          <TextWrapper>Note</TextWrapper>
          <BaseTextAreaInput rows={4} />
        </RowWrapper>
      </FlexGridWrapper>
      {typeAccount === 2 && agencyForm()}
      <ButtonGroup>
        <BaseButton bold uppercase primary type='submit'>
          Create Account
        </BaseButton>
        <BaseButton
          style={{ marginRight: 20 }}
          uppercase
          bold
        >
          Cancel
        </BaseButton>
      </ButtonGroup>
    </ContainerWrapper>
  )
}


export default React.memo(CreateAccountForm)
