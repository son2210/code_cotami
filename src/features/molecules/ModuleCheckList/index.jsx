import { withArray, withEmpty, withNumber } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import SectionCheckList from '../SectionCheckList'
import {
  ButtonCreateSection,
  Collapse,
  ContainerSection,
  Icon,
  IconRemoveModule,
  Module,
  SectionCount,
  Title,
  Wrapper
} from './styled'

const ModuleCheckList = ({ modules, index, onRemoveModule, ...others }) => {
  const [showSection, setShowSection] = useState({})
  const [dataModule, setDataModule] = useState({
    id: 0,
    title: '',
    description: '',
    sections: []
  })

  const onChangeData = useCallback(
    (field, value) => {
      setDataModule(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [dataModule]
  )

  const toggleSection = useCallback(
    id => {
      setShowSection(prev => {
        return { ...prev, [id]: !prev[id] }
      })
    },
    [showSection.sections]
  )

  const createSection = useCallback(() => {
    const temp = dataModule.sections.push([])
    onChangeData('sections', temp)
  }, [dataModule])

  const removeModule = useCallback(() => setDataModule(null), [])

  const renderSection = useCallback(
    (module, index) => {
      return (
        <Collapse collapse={showSection[index]}>
          {withArray('sections', module).map((section, key) => {
            return (
              <SectionCheckList
                type={withEmpty('inputTypeId.title', section)}
                sectionTitle={withEmpty('title', section)}
                description={withEmpty('description', section)}
                sectionItems={withArray('sectionItems', section)}
                key={`section ${key}`}
              />
            )
          })}
          <ButtonCreateSection dashed={1} onClick={createSection}>
            <Icon name='feather-plus' size={16} />
            <Title>Create section</Title>
          </ButtonCreateSection>
        </Collapse>
      )
    },
    [showSection]
  )

  const renderModule = useCallback(
    (module, index) => {
      if (!dataModule) return null
      return (
        <Module key={index}>
          <Title h2 bold>
            {withEmpty('title', module) || 'title'}
          </Title>
          <Title h4 light>
            {withEmpty('description', module) || 'description'}
          </Title>
          <IconRemoveModule
            name={'feather-trash-2'}
            size={26}
            onClick={() => {
              onRemoveModule(index)
              removeModule()
            }}
          />
          <ContainerSection>
            <SectionCount onClick={() => toggleSection(index)}>
              {`${withNumber('sections.length', module)} section`}
              <Icon name='feather-chevron-down' size={16} />
            </SectionCount>

            {renderSection(module, index)}
          </ContainerSection>
        </Module>
      )
    },
    [showSection, dataModule]
  )

  useEffect(() => {
    setDataModule({
      id: withNumber('id', modules),
      title: withEmpty('title', modules),
      description: withEmpty('description', modules),
      sections: withArray('sections', modules)
    })
  }, [modules])

  return <Wrapper {...others}>{renderModule(dataModule, index)}</Wrapper>
}

ModuleCheckList.propTypes = {
  modules: PropTypes.object,
  index: PropTypes.number,
  onRemoveModule: PropTypes.func,
  createSection: PropTypes.func
}

export default React.memo(ModuleCheckList)
