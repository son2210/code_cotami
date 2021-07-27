import styled from 'styled-components'
import {
  BaseTitle,
  BaseUploadFile,
  BaseText,
  BaseInput,
  BaseButton,
  BaseIcon
} from 'atoms'
import { BaseCheckPicker, BaseInputPicker } from 'atoms'
import CheckBoxGroup from '../CheckBoxGroup'
import RadioForm from '../RadioForm'

export const Wrapper = styled.div`
  border-top: 2px solid ${props => props.theme.colors.secondary[6]};
  width: 100%;
  padding: 20px 0;
  margin: 20px auto;
`
export const Title = styled(BaseTitle)``

export const WrapperTop = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & div {
    margin-right: 10px;
  }
`
export const WrapperContent = styled.div``

export const Drag = styled(BaseUploadFile)`
  min-height: 80px;
  width: 100%;
  .rs-uploader-trigger-btn {
    height: 100%;
    width: 100% !important;
  }
`
export const DragText = styled(BaseText)`
  font-weight: bold;
  vertical-align: center;
`
export const CheckPicker = styled(BaseCheckPicker)`
  font-weight: bold;
  &.rs-picker-check {
    a {
      padding: 2px 5px !important;
      background: ${props => props.theme.colors.secondary[6]} !important;
      & .rs-picker-toggle-caret {
        top: 2px !important;
      }
      & .rs-picker-toggle-value {
        color: ${props => props.theme.colors.primary} !important;
        font-weight: bold !important;
      }
      & .rs-picker-toggle-clean {
        top: 2px !important;
      }
    }
  }
`

export const InputPicker = styled(BaseInputPicker)`
  & .rs-picker-toggle {
    height: 25px !important;
    padding: 2px 5px !important;
    background: ${props => props.theme.colors.secondary[6]} !important;
    & .rs-picker-toggle-caret {
      top: 2px !important;
    }
    .rs-picker-toggle-value {
      color: ${props => props.theme.colors.primary} !important;
      font-weight: bold !important;
    }
    .rs-picker-toggle-clean {
      top: 2px !important;
    }
  }
  & .rs-picker-tag-wrapper {
    height: 25px !important;
    input {
      padding: 2px !important;
    }
  }
`
export const CheckBox = styled(CheckBoxGroup)`
  margin-left: -10px;
`
export const Input = styled(BaseInput)`
  ${props =>
    props.borderNone &&
    `border: none !important;    
    padding: 10px 0 !important;`}
  ${props => props.h2 && `font-size: 18px !important;`}
  ${props => props.h3 && `font-size: 14px !important;`}
`
export const Radio = styled(RadioForm)`
  display: block !important;
  margin-left: -10px;
  & .rs-radio {
    margin-left: unset;
  }
`
export const Block = styled.div`
  margin: 5px 0;
`
export const IconRemoveSection = styled(BaseButton)``
export const Icon = styled(BaseIcon)``
