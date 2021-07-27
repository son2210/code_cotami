import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { Constant } from 'utils'
import {
  Block,
  CheckBox,
  Drag,
  DragText,
  Icon,
  Input,
  InputPicker,
  Radio,
  Title,
  Wrapper,
  WrapperContent,
  WrapperTop
} from './styled'

const SectionCheckList = ({
  orderNumber,
  sectionTitle,
  description,
  sectionItems,
  type,
  removeSection,
  updateSection,
  index,
  preview = false,
  ...others
}) => {
  // vi tri section trong modules
  const [dataSection, setDataSection] = useState({
    id: index,
    title: sectionTitle,
    description: description,
    sectionItems: sectionItems || [],
    inputTypeId: type
  })

  const onChangeData = useCallback(
    (field, value) => {
      setDataSection(prev => ({
        ...prev,
        [field]: value
      }))
      const temp = { ...dataSection, [field]: value }
      updateSection(index, orderNumber, temp)
    },
    [dataSection]
  )

  const _renderSectionItem = useCallback(
    type => {
      switch (type) {
        case Constant.sectionType[0].value:
          return (
            <Radio
              options={sectionItems}
              setOptions={value => onChangeData('sectionItems', value)}
              block
              addItem={!preview}
            />
          )
        case Constant.sectionType[1].value:
          return (
            <CheckBox
              options={sectionItems}
              setOptions={value => onChangeData('sectionItems', value)}
              addItem={!preview}
            />
          )
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
    [dataSection]
  )

  return (
    <Wrapper {...others}>
      {!preview ? (
        <WrapperTop>
          <InputPicker data={Constant.sectionShare} placeholder='Private' />
          <InputPicker
            data={Constant.sectionType}
            onChange={e => onChangeData('inputTypeId', e)}
            value={dataSection.inputTypeId}
            placeholder='Unit'
          />
          <Icon
            name='feather-x'
            size={24}
            onClick={() => removeSection(index)}
          />
        </WrapperTop>
      ) : null}
      <WrapperContent>
        <Title H2 bold>
          {preview ? `${orderNumber}. ` : null}
          {!preview ? (
            <Input
              placeHolder='Title'
              value={dataSection.title}
              onChange={e => onChangeData('title', e)}
              disabled={preview}
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
            disabled={preview}
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
  preview: PropTypes.bool,
  removeSection: PropTypes.func,
  updateSection: PropTypes.func,
  index: PropTypes.number
}

export default React.memo(SectionCheckList)
