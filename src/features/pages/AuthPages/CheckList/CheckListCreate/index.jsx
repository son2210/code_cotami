import { EndPoint } from 'config/api'
import { withEmpty, withNumber } from 'exp-value'
import { useAlert, useRequestManager } from 'hooks'
import { RadioForm } from 'molecules'
import { CreateModule } from 'organisms'
import React, { useState } from 'react'
import { useCallback } from 'react/cjs/react.development'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  addModule,
  globalModulesState,
  removeModule,
  updateModule
} from 'stores/CreateForm'
import PreviewCheckList from '../PreviewCheckList'
import {
  Button,
  Content,
  Form,
  Icon,
  Input,
  Label,
  ThemeBlock,
  Title,
  Wrapper,
  WrapperBlock,
  WrapperButton,
  WrapperContent,
  WrapperForm,
  WrapperItem
} from './styled'
import { formCheckListCreate } from './validation'

const CheckListCreate = () => {
  const [step, setStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [formCheckList, setFormCheckList] = useState({
    title: '',
    description: '',
    unit: '',
    display: ''
  })
  const modules = useRecoilValue(globalModulesState)
  const resetState = useResetRecoilState(globalModulesState)
  const handleAddModule = useSetRecoilState(addModule)
  const handleUpdateModule = useSetRecoilState(updateModule)
  const handleRemoveModule = useSetRecoilState(removeModule)

  const { onPostExecute } = useRequestManager()
  const { showWarning } = useAlert()

  const navigationPage = useCallback(
    type => {
      if (step < 1) return setStep(1)
      if (step > 2) return setStep(2)
      if (type === 'prev') return setStep(step - 1)
      setStep(step + 1)
    },
    [step]
  )
  const hideModal = useCallback(() => setShowPreview(false), [
    showPreview,
    modules
  ])
  const showModal = useCallback(() => setShowPreview(true), [
    showPreview,
    modules
  ])
  const handleChangeForm = useCallback(
    (field, value) => {
      setFormCheckList(prev => ({
        ...prev,
        [field]: value
      }))
    },
    [formCheckList]
  )

  const validateForm = useCallback(
    errors => {
      let listError = [...new Set(Object.values(errors))]
      if (listError && withNumber('length', listError)) {
        showWarning(listError[0].toString())
        return
      }

      return navigationPage('next')
    },
    [formCheckList]
  )

  const submit = useCallback(async () => {
    const response = await onPostExecute(EndPoint.FORM_CREATE, {
      ...formCheckList,
      modules: modules,
      templateId: modules.id,
      displayMode: formCheckList.display
    })
    console.log(response, 'abc')
    if (response) {
      resetState()
    }
  }, [modules, formCheckList])

  // const _renderTheme = useCallback(() => {
  //   return (
  //     <FlexBlock>
  //       <Theme />
  //       <Theme />
  //       <Theme />
  //       <Theme />
  //     </FlexBlock>
  //   )
  // }, [])

  const _renderModalPreviewCheckList = useCallback(() => {
    return (
      <PreviewCheckList
        moduleName={'Checklist module name'}
        modules={modules}
        show={showPreview}
        onHide={hideModal}
      />
    )
  }, [showPreview, modules, hideModal])

  const _renderModule = useCallback(
    modules => {
      return (
        <WrapperContent>
          <CreateModule
            data={modules}
            onRemoveModule={id => handleRemoveModule(id)}
            onCreateModule={handleAddModule}
            updateModule={handleUpdateModule}
          />
        </WrapperContent>
      )
    },
    [modules]
  )

  const _renderContent = useCallback(() => {
    if (step == 1) {
      resetState()
      return (
        <WrapperContent>
          <Title H2 bold>
            Choose a template
          </Title>
          <ThemeBlock>
            <Title H3>Recents</Title>
            {/* {_renderTheme()} */}
          </ThemeBlock>

          <ThemeBlock>
            <Title H3>All theme</Title>
            {/* {_renderTheme()} */}
          </ThemeBlock>
        </WrapperContent>
      )
    }

    return _renderModule(modules)
  }, [step, modules])

  const _renderForm = useCallback(() => {
    if (step == 1)
      return (
        <WrapperForm>
          <Title H2 bold>
            Checklist info
          </Title>

          <Form
            fluid
            model={formCheckListCreate}
            formValue={formCheckList}
            onCheck={validateForm}
          >
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

            {/* <WrapperBlock>
              <Label bold> Unit </Label>
              <BaseInputPicker
                data={Constant.unit}
                placeholder='All'
                block
                value={withEmpty('unit', formCheckList)}
                onChange={value => handleChangeForm('unit', value)}
                name='unit'
              />
            </WrapperBlock> */}
            <WrapperBlock>
              <Label bold> Display </Label>
              <RadioForm
                name='display'
                value={withEmpty('display', formCheckList)}
                onChange={value => handleChangeForm('display', value)}
              />
            </WrapperBlock>

            <WrapperBlock>
              <Button type={'submit'} primary fluid>
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

        {/* <WrapperItem>
          <Title>Unit</Title>
          <Content>{withEmpty('unit', formCheckList) || 'all'}</Content>
        </WrapperItem> */}

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
