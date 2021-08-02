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
import { BaseInputPicker, BaseButton, BaseDatePicker } from 'atoms'
import { InputBlock } from 'molecules/ProfileChange'
import { validateModelUpdate, validateModelCreate } from './validateModel'
import { Constant } from 'utils'

const StaffForm = ({
  isUpdate,
  units,
  handleInput,
  data,
  error,
  onSubmit,
  onClose,
  formOthers
}) => {
  return (
    <ContainerWrapper
      model={isUpdate ? validateModelUpdate : validateModelCreate}
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
            disabled={isUpdate ? true : false}
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
            <BaseInputPicker data={units} placeholder='Unit' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Role</TitleWrapper>
            <BaseInputPicker data={Constant.Role} placeholder='Status' />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Date of Birth</TitleWrapper>
            <BaseDatePicker
              placeholder='Date of Birth'
              onChange={value => handleInput('dateOfBirth', value)}
              value={data['dateOfBirth']}
              helpText={error['dateOfBirth']}
              isError={!error['dateOfBirth'] ? false : true}
              style={{ width: '100%' }}
            />
          </BlockFieldWrapper>
          <BlockFieldWrapper column={'column'}>
            <TitleWrapper>Status</TitleWrapper>
            <ToggleWrapper
              defaultChecked={!isUpdate && true}
              checked={
                data['status'] === Constant.CellColor.ACTIVE ? true : false
              }
              onChange={checked => {
                handleInput(
                  'status',
                  checked
                    ? Constant.CellColor.ACTIVE
                    : Constant.CellColor.INACTIVE
                )
              }}
            />
          </BlockFieldWrapper>
        </ColWrapper>
      </FlexGridWrapper>

      <ButtonGroup>
        <BaseButton bold uppercase primary type='submit'>
          {isUpdate ? ' Update' : 'Create'}
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
  isUpdate: PropTypes.bool,
  units: PropTypes.array,
  onClose: PropTypes.func
}

export default React.memo(StaffForm)
