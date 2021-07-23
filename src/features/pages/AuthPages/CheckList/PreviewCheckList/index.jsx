import React, { useCallback, useState } from 'react'
import {
  Wrapper,
  Title,
  LineProgress,
  Button,
  WrapperProgress,
  WrapperFooter,
  Icon,
  WrapperModal,
  Body
} from './styled'
import PropTypes from 'prop-types'
import { withArray, withEmpty, withNumber } from 'exp-value'
import { useTheme } from 'styled-components'
import { SectionPreview } from 'molecules'

const PreviewCheckList = ({ moduleName, modules, show, onHide, ...others }) => {
  const moduleNumber = React.useMemo(() => withNumber('length', modules), [
    modules
  ])
  const [step, setStep] = useState(1)
  const theme = useTheme()

  const activeStep = useCallback(
    type => {
      if (type === 'next' && step < moduleNumber) return setStep(step + 1)
      if (type === 'prev' && step > 1) return setStep(step - 1)
    },
    [step, moduleNumber]
  )

  const renderModule = useCallback(
    module => {
      return (
        <Wrapper>
          <WrapperProgress
            step={step}
            final={moduleNumber}
            moduleTitle={withEmpty('title', module)}
            description={withEmpty('description', module)}
          />
          {withArray('sections', module).map((section, index) => {
            return (
              <SectionPreview
                key={index + withEmpty('id', section)}
                section={section}
                preview
                orderNumber={index + 1}
              />
            )
          })}
        </Wrapper>
      )
    },
    [step, modules, moduleNumber]
  )

  const _renderModal = useCallback(() => {
    return (
      <>
        <WrapperModal.Header>
          <Title H2 style={{ marginLeft: 20 }}>
            {moduleName}
          </Title>
          <LineProgress
            percent={(step * 100) / moduleNumber}
            strokeColor={theme.colors.progress[0]}
            showInfo={false}
            strokeWidth={5}
          />
        </WrapperModal.Header>
        <Body>{renderModule(modules[step - 1])}</Body>
        <WrapperModal.Footer>
          <WrapperFooter>
            <Button
              onClick={() => activeStep('prev')}
              hide={step === 1}
              secondary
              bold
            >
              <Icon name='feather-chevron-left' size={18} /> Previous
            </Button>
            <Button
              onClick={() => activeStep('next')}
              secondary
              bold
              hide={step === moduleNumber}
            >
              Next
              <Icon name='feather-chevron-right' size={18} />
            </Button>
            {step == moduleNumber && (
              <Button onClick={() => activeStep('next')} primary finish bold>
                Finish
              </Button>
            )}
          </WrapperFooter>
        </WrapperModal.Footer>
      </>
    )
  }, [modules, step, moduleNumber])

  if (!modules || withNumber('length', modules) == 0) return null

  return (
    <WrapperModal show={show} onHide={onHide} {...others}>
      {_renderModal()}
    </WrapperModal>
  )
}

PreviewCheckList.propTypes = {
  moduleName: PropTypes.string,
  modules: PropTypes.array.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func
}

export default PreviewCheckList
