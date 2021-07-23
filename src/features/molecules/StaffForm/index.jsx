import React from 'react'
import PropTypes from 'prop-types'
import {
  ContainerWrapper,
  ColWrapper,
  BlockFieldWrapper,
  FlexGridWrapper,
  TitleWrapper,
  ToggleWrapper
} from './styled'
import { BaseCheckPicker, BaseInputPicker } from 'atoms'
import { InputBlock } from 'molecules/ProfileChange'

const StaffForm = ({ handleInput, data, error, ...others }) => {
  console.log(data)
  // mock
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
  return (
    <ContainerWrapper>
      <FlexGridWrapper>
        <ColWrapper colspan={9}>
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
        </ColWrapper>
        <ColWrapper colspan={9}>
          <BlockFieldWrapper column={'column'} {...others}>
            <TitleWrapper>Unit</TitleWrapper>
            <BaseCheckPicker data={dataSelect} placeholder='Unit' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'} {...others}>
            <TitleWrapper>Role</TitleWrapper>
            <BaseInputPicker data={dataSelect} placeholder='Status' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'} {...others}>
            <TitleWrapper>Status</TitleWrapper>
            <ToggleWrapper />
          </BlockFieldWrapper>
        </ColWrapper>
      </FlexGridWrapper>
    </ContainerWrapper>
  )
}

StaffForm.propTypes = {
  error: PropTypes.object,
  data: PropTypes.object,
  handleInput: PropTypes.func
}

export default React.memo(StaffForm)
