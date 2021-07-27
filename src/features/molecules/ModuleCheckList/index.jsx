import { withArray, withEmpty, withNumber } from 'exp-value'
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
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
  Wrapper,
  Input
} from './styled'

const ModuleCheckList = ({
  modules,
  index,
  onRemoveModule,
  updateModule,
  ...others
}) => {
  const [showSection, setShowSection] = useState({})
  const [dataModule, setDataModule] = useState({
    id: index,
    title: withEmpty('title', modules),
    description: withEmpty('description', modules),
    sections: withArray('sections', modules)
  })

  const onChangeData = useCallback(
    (field, value) => {
      setDataModule(prev => ({
        ...prev,
        [field]: value
      }))
      let temp = {
        ...dataModule,
        [field]: value
      }
      updateModule(index, temp)
    },
    [dataModule, index]
  )

  const toggleSection = useCallback(
    id => {
      setShowSection(prev => {
        return { ...prev, [id]: !prev[id] }
      })
    },
    [showSection]
  )

  const createSection = useCallback(() => {
    const temp = dataModule.sections
    temp.push({
      id: temp.length,
      title: '',
      description: '',
      sectionItems: [],
      inputTypeId: 'multiple_choice'
    })

    let state = {
      ...dataModule,
      sections: temp
    }
    setDataModule(state)
    updateModule(index, state)
  }, [dataModule, index])

  const removeSection = useCallback(
    id => {
      const temp = dataModule.sections
      temp.splice(id, 1)
      let state = {
        ...dataModule,
        sections: temp
      }
      setDataModule(state)
      updateModule(index, state)
    },
    [dataModule.sections]
  )

  const updateSection = useCallback(
    (index, orderNumber, temp) => {
      dataModule.sections[orderNumber] = temp
      updateModule(index, dataModule)
    },
    [dataModule]
  )

  const renderSection = useCallback(
    (module, index) => {
      return (
        <Collapse collapse={showSection[index]}>
          {withArray('sections', module).map((section, key) => {
            return (
              <SectionCheckList
                type={withEmpty('inputTypeId', section)}
                sectionTitle={withEmpty('title', section)}
                description={withEmpty('description', section)}
                sectionItems={withArray('sectionItems', section)}
                orderNumber={key}
                removeSection={removeSection}
                updateSection={updateSection}
                index={index}
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
          <Input
            placeHolder='Title'
            value={withEmpty('title', module)}
            onChange={e => onChangeData('title', e)}
            borderNone={1}
            h2
            bold
          />
          <Input
            placeHolder='Title'
            value={withEmpty('description', module)}
            onChange={e => onChangeData('description', e)}
            borderNone={1}
            h2
            bold
          />
          <IconRemoveModule
            name={'feather-trash-2'}
            size={26}
            onClick={() => onRemoveModule(index)}
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
      id: index,
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
  createSection: PropTypes.func,
  updateModule: PropTypes.func
}

export default React.memo(ModuleCheckList)
