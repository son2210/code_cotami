import React from 'react'
import {
  WrapperModal,
  TargetType,
  ModalBody,
  SelectUser,
  Title
} from './styled'
import PropTypes from 'prop-types'
import { Constant } from 'utils'

function ModalTargetUser({
  commentType = 'targetUsers',
  onChangeType,
  commentOfUsers,
  showListUser = commentType == 'targetUsers',
  ...others
}) {
  return (
    <WrapperModal {...others} showListUser>
      <WrapperModal.Header>
        <Title>Details</Title>
      </WrapperModal.Header>
      <ModalBody>
        <TargetType
          value={commentType}
          onChange={onChangeType}
          options={Constant.commentType}
        />
        {showListUser && <SelectUser data={commentOfUsers} active />}
      </ModalBody>
    </WrapperModal>
  )
}
ModalTargetUser.propTypes = {
  commentType: PropTypes.string,
  commentOfUsers: PropTypes.array,
  onChangeType: PropTypes.func,
  showListUser: PropTypes.bool
}
export default ModalTargetUser
