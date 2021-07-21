import React from 'react'
import {
  Wrapper,
  WrapperTop,
  WrapperContent,
  Title,
  Icon,
  Drag,
  DragText,
  CheckPicker,
  InputPicker,
  CheckBox,
  Input,
  Radio
} from './styled'
import PropTypes from 'prop-types'

const SectionCheckList = ({
  orderNumber,
  sectionTitle,
  description,
  sectionItems,
  type,
  preview = false,
  ...others
}) => {
  return (
    <Wrapper {...others}>
      {!preview ? (
        <WrapperTop>
          <CheckPicker data={data} placeholder='Unit' />
          <InputPicker data={data} placeholder='Unit' />
          <Icon name='feather-x' size={16} />
        </WrapperTop>
      ) : null}
      <WrapperContent>
        <Title H2 bold>
          {(orderNumber ? `${orderNumber}. ` : '') + (sectionTitle || 'Title')}
        </Title>
        <Title H4>{description}</Title>
        {type == 'multiple-choice' ? (
          <CheckBox
            options={sectionItems || fakeData}
            addItem={!preview ? 1 : 0}
          />
        ) : type == 'single-choice' ? (
          <Radio
            options={sectionItems || fakeOption}
            block
            addItem={!preview ? 1 : 0}
          />
        ) : type == 'input' ? (
          <Input place='type description' />
        ) : type == 'inputFile' ? (
          <Drag draggable onChange={e => console.log(e)} autoUpload={false}>
            <DragText>{'upload_file'}</DragText>
          </Drag>
        ) : type == 'inputNumber' ? (
          <Input type='number' />
        ) : null}
      </WrapperContent>
    </Wrapper>
  )
}

SectionCheckList.propTypes = {
  orderNumber: PropTypes.number,
  description: PropTypes.string,
  sectionItems: PropTypes.array,
  type: PropTypes.string,
  sectionTitle: PropTypes.string,
  preview: PropTypes.bool
}

export default React.memo(SectionCheckList)

const data = [
  {
    value: '1',
    label: 'user 1'
  },
  {
    value: '2',
    label: 'user 2'
  }
]

const fakeData = [
  { content: 'description 1', id: 1 },
  { content: 'description', id: 2 },
  { content: 'description', id: 3 },
  { content: 'description', id: 4 }
]
const fakeOption = [
  {
    value: 'auto',
    label: 'auto'
  },
  {
    value: 'manual',
    label: 'manual'
  },
  {
    value: 'hide',
    label: 'hide'
  }
]
