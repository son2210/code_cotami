import { BaseInputPicker } from 'atoms'
import { withEmpty } from 'exp-value'
import { RadioForm } from 'molecules'
import { CreateModule } from 'organisms'
import React, { useEffect, useState } from 'react'
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
    (type, idModule) => {
      let temp = modules
      if (type === 'addModule') {
        temp.push([])
        setModules(temp)
      }

      if (
        type === 'removeModule' &&
        idModule >= 0 &&
        idModule < modules?.length
      ) {
        temp.splice(idModule, 1)
        setModules(temp)
      }
    },
    [modules]
  )
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
      />
    )
  }, [showPreview, modules])

  const _renderModule = useCallback(() => {
    return (
      <WrapperContent>
        <CreateModule
          data={modules}
          onRemoveModule={id => handleUpdateModule('removeModule', id)}
          onCreateModule={() => handleUpdateModule('addModule')}
        />
      </WrapperContent>
    )
  }, [modules, step])

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
            <Title H3>Recents</Title>
            {_renderTheme()}
          </ThemeBlock>
        </WrapperContent>
      )
    return _renderModule()
  }, [step, modules])

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
          <Button primary onClick={() => navigationPage('next')}>
            Submit
          </Button>
        </WrapperButton>
      </WrapperForm>
    )
  }, [step, formCheckList])

  useEffect(() => setModules(fakeModules), [])

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

const fakeModules = [
  {
    id: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    index: 0,
    sections: [
      {
        id: 'string',
        title: '1. Title of Section',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        sectionItems: [
          {
            id: 'string',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            id: 'string',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            id: 'string',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'single-choice',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      },
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'single-choice',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      },
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'single-choice',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    index: 1,
    sections: [
      {
        id: 'string',
        title: 'string',
        description:
          '213Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        sectionItems: [
          {
            id: 'string',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            id: 'string',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'single-choice',
          description:
            'qwLorem ipsum dolor sit amet, consectetur adipiscing elit.',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  },
  {
    id: 2,
    description: 'string',
    index: 2,
    sections: [
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'input',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  },
  {
    id: 3,
    description: 'string',
    index: 3,
    sections: [
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'inputFile',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  },
  {
    id: 4,
    description: 'string',
    index: 4,
    sections: [
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'inputNumber',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  },
  {
    id: 5,
    description: 'string',
    index: 5,
    sections: [
      {
        id: 'string',
        title: 'string',
        description: 'string',
        sectionItems: [
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          },
          {
            id: 'string',
            title: 'string'
          }
        ],
        inputTypeId: {
          id: 'string',
          title: 'multiple-choice',
          description: 'string',
          guidelineImageUrl: 'string',
          previewImageUrl: 'string'
        }
      }
    ]
  }
]
