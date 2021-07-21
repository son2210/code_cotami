import React, { useState } from 'react'
import {
  Wrapper,
  WrapperContent,
  WrapperForm,
  Title,
  ThemeBlock,
  Theme,
  FlexBlock,
  Form,
  WrapperBlock,
  WrapperButton,
  Label,
  Button,
  WrapperItem,
  Content,
  Icon,
  HeaderModule,
  ModuleCount,
  Modal
} from './styled'
import { InputGroup, RadioForm, ModuleCheckList } from 'molecules'
import { BaseInputPicker } from 'atoms'
import { useCallback } from 'react/cjs/react.development'
import { withNumber } from 'exp-value'
import PreviewCheckList from '../PreviewCheckList'

const CheckListCreate = () => {
  const [step, setStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
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
      <Modal
        show={showPreview}
        onHide={hideModal}
        body={<PreviewCheckList modules={modules} />}
      />
    )
  }, [showPreview])

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
    return (
      <WrapperContent>
        <HeaderModule>
          <Title H2 bold>
            Choose a template
          </Title>
          <ModuleCount>
            {`${withNumber('sections.length', null)} section`}
            <Button dashed={1}>
              <Icon name='feather-plus' size={16} />
              New module
            </Button>
          </ModuleCount>
        </HeaderModule>
        <ModuleCheckList data={modules} />
      </WrapperContent>
    )
  }, [step])

  const _renderForm = useCallback(() => {
    if (step == 1)
      return (
        <WrapperForm>
          <Title H2 bold>
            Checklist info
          </Title>

          <Form>
            <InputGroup placeholder='Title' />

            <InputGroup
              placeholder='Description'
              componentClass='textarea'
              rows={3}
            />

            <WrapperBlock>
              <Label bold> Unit </Label>
              <BaseInputPicker data={data} placeholder='All' block />
            </WrapperBlock>
            <WrapperBlock>
              <Label bold> Display </Label>
              <RadioForm />
            </WrapperBlock>

            <WrapperBlock>
              <Button
                primary
                style={{ width: '100%' }}
                onClick={() => navigationPage('next')}
              >
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
          <Content>Checklist info</Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Description</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Unit</Title>
          <Content>All</Content>
        </WrapperItem>

        <WrapperItem>
          <Title>Display</Title>
          <Content>Auto</Content>
        </WrapperItem>

        <WrapperButton>
          <Button blue onClick={showModal}>
            <Icon name='feather-eye' size={16} />
            Preview
          </Button>
          <Button primary onClick={() => navigationPage('next')}>
            Next
          </Button>
        </WrapperButton>
      </WrapperForm>
    )
  }, [step])

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

const modules = [
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
