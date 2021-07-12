import React from 'react'
import {
  ContainerWrapper,
  FormWrapper,
  ActionButtonWrapper,
  LinkWrapper
} from './styled'
import PropTypes from 'prop-types'
import { BaseTitle, BaseButton } from 'atoms'

const UnAuthForm = ({
  formTitle,
  children,
  primaryBtn,
  secondaryBtn,
  tertiaryBtn,
  onChange,
  ...others
}) => {
  return (
    <ContainerWrapper>
      <BaseTitle H1 bold>
        {formTitle}
      </BaseTitle>
      <FormWrapper onChange={onChange} {...others}>
        {children}

        <ActionButtonWrapper>
          {tertiaryBtn && (
            <LinkWrapper>
              <a onClick={tertiaryBtn.onClick}>{tertiaryBtn.name}</a>
            </LinkWrapper>
          )}

          {primaryBtn && (
            <BaseButton
              fluid
              primary
              uppercase
              bold
              onClick={primaryBtn.onClick}
              type='submit'
            >
              {primaryBtn.name}
            </BaseButton>
          )}
          {secondaryBtn && (
            <BaseButton
              fluid
              secondary
              uppercase
              bold
              onClick={secondaryBtn.onClick}
            >
              {secondaryBtn.name}
            </BaseButton>
          )}
        </ActionButtonWrapper>
      </FormWrapper>
    </ContainerWrapper>
  )
}

UnAuthForm.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  formTitle: PropTypes.string,
  primaryBtn: PropTypes.shape({
    name: PropTypes.string,
    onCLick: PropTypes.node
  }),
  secondaryBtn: PropTypes.shape({
    name: PropTypes.string,
    onCLick: PropTypes.node
  }),
  tertiaryBtn: PropTypes.shape({
    name: PropTypes.string,
    onCLick: PropTypes.node
  })
}

export default React.memo(UnAuthForm)
