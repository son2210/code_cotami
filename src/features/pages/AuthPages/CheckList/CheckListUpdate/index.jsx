import { EndPoint } from 'config/api'
import { withArray, withEmpty, withNumber } from 'exp-value'
import { useAlert, useModules, useRequestManager } from 'hooks'
import { CreateModule } from 'organisms'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useCallback } from 'react/cjs/react.development'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from 'recoil'
import {
  addModule,
  globalModulesState,
  presentationConfig,
  removeModule,
  updateModule
} from 'stores/CreateForm'
import PresentationConfig from '../PresentationConfig'
import PreviewCheckList from '../PreviewCheckList'
import {
  Button,
  Content,
  DisplayModeForm,
  Form,
  Icon,
  Input,
  Label,
  Title,
  Wrapper,
  WrapperBlock,
  WrapperButton,
  WrapperContent,
  WrapperForm,
  WrapperItem
} from './styled'
import { formCheckListUpdate } from './validation'

const CheckListUpdate = () => {
  const [step, setStep] = useState(1)
  const [formId, setFormId] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [formCheckList, setFormCheckList] = useState({
    title: '',
    description: '',
    unit: '',
    displayMode: ''
  })

  const [modules, setModules] = useRecoilState(globalModulesState)
  const resetState = useResetRecoilState(globalModulesState)
  const handleAddModule = useSetRecoilState(addModule)
  const handleUpdateModule = useSetRecoilState(updateModule)
  const handleRemoveModule = useSetRecoilState(removeModule)
  const presentConfig = useRecoilValue(presentationConfig)
  const history = useHistory()
  const { search } = useLocation()

  const { handleError } = useModules()

  const { onPatchExecute, onGetExecute } = useRequestManager()
  const { showError, showSuccess } = useAlert()

  const navigationPage = useCallback(
    type => {
      if (step < 1) return setStep(1)
      if (step > 3) return setStep(3)
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
      let temp = handleError(modules)
      if (temp) showError(temp)
      else showSuccess('Module ready!!!')

      let listError = [...new Set(Object.values(errors))]
      if (listError && withNumber('length', listError)) {
        showError(listError[0].toString())
        return
      }
      return navigationPage('next')
    },
    [formCheckList]
  )

  const submit = useCallback(() => {
    async function postData() {
      const response = await onPatchExecute(EndPoint.UPDATE_FORM(formId), {
        ...formCheckList,
        modules: modules,
        presentationConfig: presentConfig
      })
      if (response) {
        showSuccess('Success update form')
        setTimeout(() => {
          resetState()
          history.goBack()
        }, 3000)
        return
      }
      showError('Error !. Check data submit')
    }
    postData()
  }, [formId, modules, formCheckList, presentConfig])

  const _renderModalPreviewCheckList = useCallback(() => {
    return (
      <PreviewCheckList
        moduleName={withEmpty('title', formCheckList)}
        modules={modules}
        show={showPreview}
        onHide={hideModal}
      />
    )
  }, [showPreview, hideModal])

  const _renderContent = useCallback(() => {
    if (step == 1)
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
    return <PresentationConfig />
  }, [step, modules, presentConfig])

  const _renderForm = useCallback(() => {
    if (step == 1)
      return (
        <WrapperForm>
          <Title H2 bold>
            Checklist info
          </Title>

          <Form
            fluid
            model={formCheckListUpdate}
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

            <WrapperBlock>
              <Label bold> Display </Label>
              <DisplayModeForm
                name='displayMode'
                value={withEmpty('displayMode', formCheckList)}
                onChange={value => handleChangeForm('displayMode', value)}
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
          <Content>{withEmpty('description', formCheckList)}</Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Display</Title>
          <Content>{withEmpty('displayMode', formCheckList)}</Content>
        </WrapperItem>
        <WrapperBlock>
          <Button blue onClick={showModal} fluid>
            <Icon name='feather-eye' size={16} />
            Preview
          </Button>

          <WrapperButton>
            <Button blue onClick={() => navigationPage('prev')}>
              Continue Edit
            </Button>
            <Button primary onClick={submit}>
              Submit
            </Button>
          </WrapperButton>
        </WrapperBlock>
      </WrapperForm>
    )
  }, [step, formCheckList, modules, presentConfig])

  useEffect(() => {
    const formId = new URLSearchParams(search).get('formId')
    if (!formId) return
    setFormId(formId)
    async function execute(id) {
      const response = await onGetExecute(`${EndPoint.GET_FORM(id)}`, {})
      if (response) {
        setModules(withArray('modules', response))
        setFormCheckList({
          title: withEmpty('title', response),
          description: withEmpty('description', response),
          displayMode: withEmpty('displayMode', response)
        })
      }
    }
    execute(formId)
  }, [search])

  return (
    <Wrapper>
      {_renderContent()}
      {_renderForm()}
      {_renderModalPreviewCheckList()}
    </Wrapper>
  )
}

export default CheckListUpdate
