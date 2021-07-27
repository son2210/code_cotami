import { BaseInputPicker } from 'atoms'
import { withEmpty, withNumber } from 'exp-value'
import { RadioForm } from 'molecules'
import { CreateModule } from 'organisms'
import React, { useState } from 'react'
import { useCallback } from 'react/cjs/react.development'
import PreviewCheckList from '../PreviewCheckList'
import {
  Button,
  Content,
  FlexBlock,
  Form,
  Icon,
  Input,
  Label,
  Theme,
  ThemeBlock,
  Title,
  Wrapper,
  WrapperBlock,
  WrapperButton,
  WrapperContent,
  WrapperForm,
  WrapperItem
} from './styled'
import { useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'

const CheckListCreate = () => {
  const [step, setStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [formCheckList, setFormCheckList] = useState({
    title: '',
    description: '',
    unit: '',
    display: ''
  })

  const [modules, setModules] = useState([])
  const [numModule, setNumModule] = useState(0)
  const { onPostExecute } = useRequestManager()

  const navigationPage = useCallback(
    type => {
      if (step < 1) return setStep(1)
      if (step > 2) return setStep(2)
      if (type === 'prev') return setStep(step - 1)
      setStep(step + 1)
    },
    [step]
  )
  const hideModal = useCallback(() => setShowPreview(false), [showPreview])
  const showModal = useCallback(() => setShowPreview(true), [showPreview])
  const handleChangeForm = useCallback(
    (field, value) => {
      setFormCheckList(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [formCheckList]
  )

  const handleUpdateModule = useCallback(
    (type, idModule, values) => {
      let temp = modules
      switch (type) {
        case 'addModule':
          temp.push({
            title: 'title',
            description: 'description',
            sections: []
          })
          setNumModule(numModule + 1)
          return setModules(temp)
        case 'removeModule':
          if (idModule >= 0 && idModule < withNumber('length', modules)) {
            setNumModule(numModule - 1)
            temp.splice(idModule, 1)
            return setModules(temp)
          }
          break
        case 'updateModule':
          modules[idModule] = values
          break
        default:
          return null
      }
    },
    [modules, numModule]
  )

  const submit = useCallback(async () => {
    const response = await onPostExecute(EndPoint.FORM_CREATE, {
      ...formCheckList,
      modules: modules,
      templateId: modules.id,
      displayMode: formCheckList.display
    })
    if (response) {
      console.log(response, 'abc')
    }
  }, [modules, formCheckList])

  const _renderTheme = useCallback(() => {
    return (
      <FlexBlock>
        <Theme />
        <Theme />
        <Theme />
        <Theme />
      </FlexBlock>
    )
  }, [])

  const _renderModalPreviewCheckList = useCallback(() => {
    return (
      <PreviewCheckList
        moduleName={'Checklist module name'}
        modules={modules}
        show={showPreview}
        onHide={hideModal}
        moduleNumber={numModule}
      />
    )
  }, [showPreview, modules, hideModal, numModule])

  const _renderModule = useCallback(
    modules => {
      return (
        <WrapperContent>
          <CreateModule
            data={modules}
            setData={setModules}
            onRemoveModule={id => handleUpdateModule('removeModule', id)}
            onCreateModule={() => handleUpdateModule('addModule')}
            updateModule={(id, value) =>
              handleUpdateModule('updateModule', id, value)
            }
          />
        </WrapperContent>
      )
    },
    [modules, numModule]
  )

  const _renderContent = useCallback(() => {
    if (step == 1)
      return (
        <WrapperContent>
          <Title H2 bold>
            Choose a template
          </Title>
          <ThemeBlock>
            <Title H3>Recents</Title>
            {_renderTheme()}
          </ThemeBlock>

          <ThemeBlock>
            <Title H3>All theme</Title>
            {_renderTheme()}
          </ThemeBlock>
        </WrapperContent>
      )
    return _renderModule(modules)
  }, [step, modules, numModule])

  const _renderForm = useCallback(() => {
    if (step == 1)
      return (
        <WrapperForm>
          <Title H2 bold>
            Checklist info
          </Title>

          <Form>
            <Input
              placeholder='Title'
              name={'title'}
              value={withEmpty('title', formCheckList)}
              onChange={value => handleChangeForm('title', value)}
            />

            <Input
              placeholder='Description'
              componentClass='textarea'
              name='description'
              rows={3}
              value={withEmpty('description', formCheckList)}
              onChange={value => handleChangeForm('description', value)}
            />

            <WrapperBlock>
              <Label bold> Unit </Label>
              <BaseInputPicker
                data={data}
                placeholder='All'
                block
                value={withEmpty('unit', formCheckList)}
                onChange={value => handleChangeForm('unit', value)}
                name='unit'
              />
            </WrapperBlock>
            <WrapperBlock>
              <Label bold> Display </Label>
              <RadioForm
                name='display'
                value={withEmpty('display', formCheckList)}
                onChange={value => handleChangeForm('display', value)}
              />
            </WrapperBlock>

            <WrapperBlock>
              <Button primary fluid onClick={() => navigationPage('next')}>
                Next
              </Button>
            </WrapperBlock>
          </Form>
        </WrapperForm>
      )

    return (
      <WrapperForm>
        <Title H2 bold>
          Checklist info
        </Title>

        <WrapperItem>
          <Title>Title</Title>
          <Content>
            {withEmpty('title', formCheckList) || 'Checklist info'}
          </Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Description</Title>
          <Content>
            {withEmpty('description', formCheckList) ||
              `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.`}
          </Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Unit</Title>
          <Content>{withEmpty('unit', formCheckList) || 'all'}</Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Display</Title>
          <Content>{withEmpty('display', formCheckList) || 'Auto'}</Content>
        </WrapperItem>

        <WrapperButton>
          <Button blue onClick={showModal}>
            <Icon name='feather-eye' size={16} />
            Preview
          </Button>
          <Button primary onClick={submit}>
            Submit
          </Button>
        </WrapperButton>
      </WrapperForm>
    )
  }, [step, formCheckList])

  return (
    <Wrapper>
      {_renderContent()}
      {_renderForm()}
      {_renderModalPreviewCheckList()}
    </Wrapper>
  )
}

export default CheckListCreate

const data = [
  {
    value: '1',
    label: '1234'
  },
  {
    value: '2',
    label: '23456'
  }
]
