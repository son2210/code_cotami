import React from 'react'
import { ModalWrapper, EmailWrapper } from './styled'
import PropTypes from 'prop-types'
import { BaseTitle, BaseButton } from 'atoms'
import { ProfileBlock, StaffForm } from 'molecules'

const StaffModal = ({ footerHandle, staffData, ...others }) => {
  const { handleInput, data, error } = staffData
  const { onClickBtn1, onClickBtn2 } = footerHandle
  return (
    <ModalWrapper
      header={
        <BaseTitle H5 bold>
          Profile Detail
        </BaseTitle>
      }
      body={
        <>
          <ProfileBlock
            canNavigate={false}
            subText={<EmailWrapper> abc@gmail</EmailWrapper>}
          />
          <StaffForm handleInput={handleInput} data={data} error={error} />
        </>
      }
      footer={
        <>
          <BaseButton uppercase bold onClick={onClickBtn1}>
            Cancel
          </BaseButton>
          <BaseButton bold uppercase primary onClick={onClickBtn2}>
            Update
          </BaseButton>
        </>
      }
      {...others}
    />
  )
}

StaffModal.propTypes = {
  children: PropTypes.node,
  staffData: PropTypes.object,
  footerHandle: PropTypes.object
}

export default React.memo(StaffModal)
