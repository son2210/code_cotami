import React, { useCallback, useState } from 'react'
import {
  Wrapper,
  Title,
  LineProgress,
  Button,
  WrapperProgress,
  WrapperFooter,
  Icon
} from './styled'
import PropTypes from 'prop-types'
import { withArray, withEmpty, withNumber } from 'exp-value'
import { useTheme } from 'styled-components'
import { SectionPreview } from 'molecules'

const PreviewCheckList = ({ moduleName, modules, ...others }) => {
  const moduleNumber = React.useMemo(() => withNumber('length', modules), [])
  const [step, setStep] = useState(1)
  const theme = useTheme()

  const activeStep = useCallback(
    type => {
      if (type === 'next' && step < moduleNumber) return setStep(step + 1)
      if (type === 'prev' && step > 1) return setStep(step - 1)
    },
    [step]
  )

  const renderModule = useCallback(
    (module, step) => {
      return (
        <Wrapper>
          <LineProgress
            percent={(step * 100) / moduleNumber}
            strokeColor={theme.colors.progress[0]}
            showInfo={false}
            strokeWidth={5}
          />
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
    [step, modules]
  )

  if (!modules || withNumber('length', modules) == 0) return null

  return (
    <Wrapper {...others}>
      <Title H2 style={{ marginLeft: 20 }}>
        {moduleName || 'Checklist module name'}
      </Title>

      {renderModule(modules[step - 1], step)}
      <WrapperFooter>
        {step != 1 && (
          <Button onClick={() => activeStep('prev')} secondary bold>
            <Icon name='feather-chevron-left' size={18} /> Previous
          </Button>
        )}
        {step != moduleNumber && (
          <Button onClick={() => activeStep('next')} secondary next bold>
            Next
            <Icon name='feather-chevron-right' size={18} />
          </Button>
        )}
        {step == moduleNumber && (
          <Button onClick={() => activeStep('next')} primary finish bold>
            Finish
          </Button>
        )}
      </WrapperFooter>
    </Wrapper>
  )
}

PreviewCheckList.propTypes = {
  moduleName: PropTypes.string,
  modules: PropTypes.array.isRequired
}

export default PreviewCheckList
