import React, { useCallback, useState } from 'react'
import SectionCheckList from '../SectionCheckList'
import { withArray, withEmpty, withNumber } from 'exp-value'
import {
  Wrapper,
  Title,
  ButtonCreateSection,
  Icon,
  ContainerSection,
  IconRemoveModule,
  SectionCount,
  Collapse,
  Module
} from './styled'
import PropTypes from 'prop-types'

const ModuleCheckList = ({ data, ...others }) => {
  const [showSection, setShowSection] = useState(true)
  const [section] = useState(data)

  const toggleSection = useCallback(() => setShowSection(!showSection), [
    showSection
  ])

  const renderModule = useCallback(() => {
    return section?.map((module, index) => {
      return (
        <Module key={index}>
          <Title h2 bold>
            {withEmpty('title', module) || 'Module name'}
          </Title>
          <Title h4 light>
            {withEmpty('description', module) || 'description'}
          </Title>
          <IconRemoveModule name={'feather-trash-2'} size={26} />
          <ContainerSection>
            <SectionCount onClick={toggleSection}>
              {`${withNumber('sections.length', module)} section`}
              <Icon name='feather-chevron-down' size={16} />
            </SectionCount>

            <Collapse>
              {withArray('sections', module).map((section, key) => {
                return (
                  <SectionCheckList
                    type={
                      withEmpty('inputTypeId.title', section) ||
                      'multiple-choice'
                    }
                    key={'sections' + key}
                    sectionTitle={withEmpty('title', section)}
                    description={withEmpty('description', section)}
                    sectionItems={withArray('sectionItems', section)}
                  />
                )
              })}
            </Collapse>
            <ButtonCreateSection dashed={1}>
              <Icon name='feather-plus' size={16} />
              <Title>Create section</Title>
            </ButtonCreateSection>
          </ContainerSection>
        </Module>
      )
    })
  }, [section])
  return <Wrapper {...others}>{renderModule()}</Wrapper>
}

ModuleCheckList.propTypes = {
  data: PropTypes.array
}

export default React.memo(ModuleCheckList)
