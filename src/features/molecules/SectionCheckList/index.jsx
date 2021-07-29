import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { Constant } from 'utils'
import {
  Block,
  CheckBox,
  Drag,
  DragIcon,
  Icon,
  Input,
  InputPicker,
  Radio,
  Title,
  Wrapper,
  WrapperContent,
  WrapperTop,
  WrapperRowButton,
  Button
} from './styled'
import { useSetRecoilState } from 'recoil'
import { swapSection, updateSection, removeSection } from 'stores/CreateForm'

const SectionCheckList = ({
  orderNumber,
  sectionTitle,
  description,
  sectionItems,
  type,
  index,
  preview = false,
  ...others
}) => {
  const handleSwapSection = useSetRecoilState(swapSection)
  const handleUpdateSection = useSetRecoilState(updateSection)
  const handleRemoveSection = useSetRecoilState(removeSection)

  const [dataSection, setDataSection] = useState({
    id: null,
    title: '',
    description: '',
    sectionItems: [],
    inputTypeId: ''
  })

  const onChangeData = useCallback(
    (field, value) => {
      setDataSection(prev => ({
        ...prev,
        [field]: value
      }))
      const temp = { ...dataSection, [field]: value }
      handleUpdateSection({ index, orderNumber, temp })
    },
    [dataSection]
  )

  const moveSection = useCallback(type => {
    handleSwapSection({ type, index, orderNumber })
  }, [])

  const _renderSectionItem = useCallback(
    type => {
      switch (type) {
        case Constant.sectionType[0].value:
          return (
            <Radio
              sectionItems={dataSection.sectionItems}
              setSectionItems={value => onChangeData('sectionItems', value)}
              block
              addItem={!preview}
            />
          )
        case Constant.sectionType[1].value:
          return (
            <CheckBox
              sectionItems={dataSection.sectionItems}
              setSectionItems={value => onChangeData('sectionItems', value)}
              addItem={!preview}
            />
          )
        case Constant.sectionType[2].value:
          return (
            <Drag draggable autoUpload={false} disabled>
              <Button>
                <DragIcon name='feather-image' size={18} />
              </Button>
            </Drag>
          )
        case Constant.sectionType[3].value:
          return (
            <Input
              placeHolder='Type description'
              componentClass='textarea'
              row={3}
              style={{ minWidth: 'unset' }}
              disabled
            />
          )
        case Constant.sectionType[4].value:
          return <Input type='number' disabled placeHolder='number' />
        default:
          return null
      }
    },
    [dataSection]
  )

  useEffect(() => {
    setDataSection({
      id: orderNumber,
      title: sectionTitle,
      description: description,
      sectionItems: sectionItems || [],
      inputTypeId: type
    })
  }, [orderNumber, sectionTitle, sectionItems, description, type])

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

          <WrapperRowButton>
            <Button onClick={() => moveSection('up')}>
              <Icon name='feather-arrow-up' size={18} />
            </Button>

            <Button onClick={() => moveSection('down')}>
              <Icon name='feather-arrow-down' size={18} />
            </Button>
          </WrapperRowButton>

          <Button onClick={() => handleRemoveSection({ index, orderNumber })}>
            <Icon name='feather-x' size={18} />
          </Button>
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
  index: PropTypes.number
}

export default React.memo(SectionCheckList)
