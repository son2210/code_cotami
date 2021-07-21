import styled from 'styled-components'
import {
  BaseThemeChecklist,
  BaseText,
  BaseTitle,
  BaseForm,
  BaseButton,
  BaseIcon,
  BaseModal
} from 'atoms'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 480px) {
    display: block;
  }
`
export const WrapperContent = styled.div`
  width: 60%;
  padding: 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`
export const WrapperForm = styled.div`
  width: 35%;
  padding: 0 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`
export const Theme = styled(BaseThemeChecklist)``
export const Label = styled(BaseText)`
  margin: 20px 0;
`
export const Title = styled(BaseTitle)`
  margin: 10px 0;
`
export const ThemeBlock = styled.div`
  border-bottom: 2px solid ${props => props.theme.colors.secondary[6]};
  padding: 20px 0;
`
export const FlexBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  & div {
    margin-right: 20px;
  }
`
export const Form = styled(BaseForm)`
  display: block;
`
export const WrapperBlock = styled.div`
  display: block;
  margin: 20px 0;
`
export const Button = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    margin-right: 10px;
  }
`
export const WrapperItem = styled.div`
  display: flex;
  align-items: baseline;
  & div:first-child {
    width: 100px;
    margin-right: 10px;
  }
`
export const WrapperButton = styled.div`
  display: flex;
  margin: 20px auto;
  align-items: center;
  & > button {
    width: 45%;
    margin: 0 auto;
  }
`
export const Content = styled.div`
  font-weight: bold;
  word-wrap: break-word;
  width: 100%;
`
export const Icon = styled(BaseIcon)``
export const HeaderModule = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ModuleCount = styled.div`
  display: flex;
  color: ${props => props.theme.colors.tertiary};
  margin-bottom: -15px;
  align-items: center;
  button {
    padding: 5px;
    border-radius: 20px;
    margin-left: 10px;
  }
`

export const Modal = styled(BaseModal)`
  width: 480px;
  .rs-modal-content {
    padding: 10px;
    border-radius: 20px;
  }
`
