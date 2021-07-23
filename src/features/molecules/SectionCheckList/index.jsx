import React, { useState, useCallback } from 'react'
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
  Radio,
  Block
} from './styled'
import PropTypes from 'prop-types'
import { Constant } from 'utils'

const SectionCheckList = ({
  orderNumber,
  sectionTitle,
  description,
  sectionItems,
  type,
  preview = false,
  ...others
}) => {
  const [dataSection, setDataSection] = useState({
    title: sectionTitle,
    description: description,
    sectionItems: sectionItems,
    inputTypeId: type
  })

  const onChangeData = useCallback((field, value) => {
    setDataSection(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const _renderSectionItem = useCallback(
    type => {
      switch (type) {
        case Constant.sectionType[0].value:
          return (
            <Radio options={sectionItems} block addItem={!preview ? 1 : 0} />
          )
        case Constant.sectionType[1].value:
          return <CheckBox options={sectionItems} addItem={!preview ? 1 : 0} />
        case Constant.sectionType[2].value:
          return (
            <Drag draggable onChange={e => console.log(e)} autoUpload={false}>
              <DragText>{'upload_file'}</DragText>
            </Drag>
          )
        case Constant.sectionType[3].value:
          return <Input place='Type description' />
        case Constant.sectionType[4].value:
          return <Input type='number' />
        default:
          return null
      }
    },
    [dataSection.inputTypeId]
  )

  return (
    <Wrapper {...others}>
      {!preview ? (
        <WrapperTop>
          <CheckPicker data={data} placeholder='Unit' />
          <InputPicker
            data={Constant.sectionType}
            onChange={e => onChangeData('inputTypeId', e)}
            value={dataSection.type}
            placeholder='Unit'
          />
          <Icon name='feather-x' size={16} />
        </WrapperTop>
      ) : null}
      <WrapperContent>
        <Title H2 bold>
          {orderNumber ? `${orderNumber}. ` : ''}
          {!preview ? (
            <Input
              placeHolder='Title'
              value={dataSection.title}
              onChange={e => onChangeData('title', e)}
              disable={preview}
              borderNone={1}
              h2
              bold
            />
          ) : (
            sectionTitle
          )}
        </Title>
        {!preview ? (
          <Input
            placeHolder='Description'
            value={dataSection.description}
            onChange={e => onChangeData('description', e)}
            disable={preview}
            borderNone={1}
            h3
            bold
          />
        ) : (
          <Title H4>{description}</Title>
        )}

        <Block>{_renderSectionItem(dataSection.inputTypeId)}</Block>
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
