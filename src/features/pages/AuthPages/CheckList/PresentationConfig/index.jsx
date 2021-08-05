import React, { useState } from 'react'
import {
  Wrapper,
  Block,
  Title,
  ItemInfo,
  Table,
  Row,
  HeaderCell
} from './styled'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Constant } from 'utils'

function PresentationConfig() {
  const [items, setItems] = useState(Constant.presentationConfig)

  const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1)
    list.splice(endIndex, 0, removed)
    return list
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    setItems(reorder(items, result.source.index, result.destination.index))
  }

  return (
    <Wrapper>
      <Block>
        <Title H2 bold>
          Presentation config
        </Title>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='table_config'>
            {provided => (
              <Table {...provided.droppableProps} ref={provided.innerRef}>
                <Row>
                  <HeaderCell>Position</HeaderCell>
                  <HeaderCell>Screen name</HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell>Duration</HeaderCell>
                </Row>

                {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.index}
                      draggableId={item.index + ''}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <ItemInfo
                            itemPresentationConfig={item}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                          />
                        )
                      }}
                    </Draggable>
                  )
                })}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </Block>

      <Block id='image'>
        <Title bold>Images</Title>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='table_image'>
            {provided => (
              <Table {...provided.droppableProps} ref={provided.innerRef}>
                <Row>
                  <HeaderCell>Position</HeaderCell>
                  <HeaderCell>Screen name</HeaderCell>
                  <HeaderCell></HeaderCell>
                  <HeaderCell>Duration</HeaderCell>
                </Row>

                {items.map((item, index) => {
                  if (item.screenType === 'image')
                    return (
                      <Draggable
                        key={item.index}
                        draggableId={item.index + ''}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <ItemInfo
                              itemPresentationConfig={item}
                              provided={provided}
                              isDragging={snapshot.isDragging}
                            />
                          )
                        }}
                      </Draggable>
                    )
                })}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </Block>
    </Wrapper>
  )
}

export default PresentationConfig

// const mockData = [
//   {
//     screenType: 'comment_yesterday',
//     index: 0,
//     duration: 10,
//     commentType: 'random'
//   },
//   {
//     screenType: 'comment_today',
//     index: 1,
//     duration: 10,
//     commentType: 'targetUsers',
//     commentOfUsers: [241, 296]
//   },
//   {
//     screenType: 'month_report_by_date',
//     index: 2,
//     duration: 10
//   },
//   {
//     screenType: 'month_report_by_week',
//     index: 3,
//     duration: 10
//   },
//   {
//     screenType: 'report_today',
//     index: 4,
//     duration: 10
//   },
//   {
//     screenType: 'report_yesterday',
//     index: 5,
//     duration: 10
//   },
//   {
//     screenType: 'weekly_report',
//     index: 6,
//     duration: 10
//   },
//   {
//     screenType: 'image',
//     index: 7,
//     duration: 10,
//     screenMatchId: 1
//   },
//   {
//     screenType: 'image',
//     index: 8,
//     duration: 10,
//     screenMatchId: 2
//   },
//   {
//     screenType: 'image',
//     index: 9,
//     duration: 10,
//     screenMatchId: 3
//   }
// ]
