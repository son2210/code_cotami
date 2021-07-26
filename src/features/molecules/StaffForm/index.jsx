import React from 'react'
import PropTypes from 'prop-types'
import {
  ContainerWrapper,
  ColWrapper,
  BlockFieldWrapper,
  FlexGridWrapper,
  TitleWrapper,
  ToggleWrapper,
  ButtonGroup
} from './styled'
import { BaseCheckPicker, BaseInputPicker, BaseButton } from 'atoms'
import { InputBlock } from 'molecules/ProfileChange'
import validateModel from './validateModel'

const StaffForm = ({
  handleInput,
  data,
  error,
  onSubmit,
  onClose,
  formOthers
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
  return (
    <ContainerWrapper
      model={validateModel}
      onSubmit={onSubmit}
      formValue={data}
      {...formOthers}
    >
      <FlexGridWrapper>
        <ColWrapper colspan={9}>
          <InputBlock
            title='First Name'
            placeholder='First Name'
            onChange={value => handleInput('firstName', value)}
            value={data['firstName']}
            helpText={error['firstName']}
            isError={!error['firstName'] ? false : true}
          />
          <InputBlock
            title='First Name'
            placeholder='Last Name'
            onChange={value => handleInput('lastName', value)}
            value={data['lastName']}
            helpText={error['lastName']}
            isError={!error['lastName'] ? false : true}
          />
          <InputBlock
            title='Email'
            placeholder='Email'
            onChange={value => handleInput('email', value)}
            value={data['email']}
            helpText={error['email']}
            isError={!error['email'] ? false : true}
            disabled={true}
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
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Unit</TitleWrapper>
            <BaseCheckPicker data={dataSelect} placeholder='Unit' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Role</TitleWrapper>
            <BaseInputPicker data={dataSelect} placeholder='Status' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Status</TitleWrapper>
            <ToggleWrapper />
          </BlockFieldWrapper>
        </ColWrapper>
      </FlexGridWrapper>

      <ButtonGroup>
        <BaseButton bold uppercase primary type='submit'>
          Update
        </BaseButton>
        <BaseButton
          style={{ marginRight: 20 }}
          uppercase
          bold
          onClick={onClose}
        >
          Cancel
        </BaseButton>
      </ButtonGroup>
    </ContainerWrapper>
  )
}

StaffForm.propTypes = {
  error: PropTypes.object,
  data: PropTypes.object,
  formOthers: PropTypes.object,
  handleInput: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
}

export default React.memo(StaffForm)
