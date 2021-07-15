import React from 'react'
import PropTypes from 'prop-types'
import {
  TableWrapper,
  CellWrapper,
  HeaderCellWrapper,
  Wrapper,
  ColumnWrapper,
  PaginationWrapper,
  MainHeaderCellWrapper,
  SubHeaderWrapper,
  HrWrapper,
  ActionCellWrapper,
  ImageCellWrapper,
  RadioCellWrapper,
  ToggleCellWrapper,
  DateTimeCellWrapper
} from './styled'
import { Constant } from 'utils'
import { ActionButtonGroup } from 'molecules'
import { BaseTag } from 'atoms'
import moment from 'moment'

const TableAction = ({
  hasPaginate = true,
  hasSummary = false,
  paginateProps,
  data,
  width,
  columns,
  ...others
}) => {
  const {
    ACTION_BUTTON_GROUP,
    IMAGE,
    RADIO_GROUP,
    GROUP,
    TOGGLE,
    DATE_TIME,
    ACTION_CELL
  } = Constant.CellType

  const _renderCell = React.useCallback((type, cellValue, others) => {
    switch (type) {
      case IMAGE:
        return <ImageCellWrapper source={cellValue} {...others} />
      case TOGGLE:
        return <ToggleCellWrapper {...others} />
      case RADIO_GROUP:
        return <RadioCellWrapper {...others} />
      case DATE_TIME: {
        const format = others?.format ? others.format : 'YYYY/MM/DD'
        const value = moment(cellValue).format(format)
        const isToday = moment(value).isSame(moment(), 'day')
        console.log(moment(value).isSame(moment(), 'day'))
        return (
          <DateTimeCellWrapper>
            {value}
            {isToday && (
              <BaseTag size={10} color='red' style={{ marginLeft: 10 }}>
                Today
              </BaseTag>
            )}
          </DateTimeCellWrapper>
        )
      }
      case GROUP:
        return
      case ACTION_BUTTON_GROUP:
        return <ActionButtonGroup {...others} />
      case ACTION_CELL:
        return (
          <ActionCellWrapper
            onClick={e => others.handleOnClick(e, cellValue)}
            {...others}
          >
            {cellValue}
          </ActionCellWrapper>
        )
      default:
        return cellValue
    }
  }, [])

  const headerSummary = React.useCallback((main, sub, index, customStyle) => {
    const firstCol = index === 0 ? true : false
    return (
      <>
        <MainHeaderCellWrapper H6>
          <span style={{ ...customStyle?.main }}>{main}</span>
        </MainHeaderCellWrapper>
        <SubHeaderWrapper style={{ ...customStyle?.sub }} firstCol={firstCol}>
          {sub}
        </SubHeaderWrapper>
      </>
    )
  }, [])

  return (
    <Wrapper style={{ width: width }}>
      {hasSummary && <HrWrapper></HrWrapper>}
      <TableWrapper
        width={width}
        headerHeight={hasSummary ? 60 : 35}
        data={data}
        {...others}
      >
        {columns.map((col, index) => (
          <ColumnWrapper
            align={col?.align || 'left'}
            width={col?.width || 60}
            key={index}
          >
            <HeaderCellWrapper style={col?.header?.style && col.header.style}>
              {hasSummary
                ? headerSummary(col.header.label, col.header.subLabel, index)
                : col.header.label}
            </HeaderCellWrapper>
            <CellWrapper minWidth={50} minHeight={50} style={col.cell.style}>
              {rowData =>
                _renderCell(
                  col.cell.type,
                  rowData[col.cell.id],
                  col.cell.others
                )
              }
            </CellWrapper>
          </ColumnWrapper>
        ))}
      </TableWrapper>

      {hasPaginate && (
        <PaginationWrapper
          lengthMenu={
            paginateProps?.lengthMenu
              ? paginateProps.lengthMenu
              : Constant.PaginateLengthMenu
          }
          activePage={paginateProps?.activePage}
          displayLength={paginateProps?.displayLength}
          total={paginateProps?.total}
          onChangePage={paginateProps?.onChangePage}
          onChangeLength={paginateProps?.onChangeLength}
        />
      )}
    </Wrapper>
  )
}

TableAction.propTypes = {
  hasPaginate: PropTypes.bool,
  width: PropTypes.number,
  paginateProps: PropTypes.shape({
    lengthMenu: PropTypes.number,
    total: PropTypes.number,
    activePage: PropTypes.number,
    displayLength: PropTypes.number,
    onChangeLength: PropTypes.func,
    onChangePage: PropTypes.func
  }),
  data: PropTypes.any,
  hasSummary: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      align: PropTypes.string,
      header: PropTypes.shape({
        label: PropTypes.string,
        style: PropTypes.any,
        subLabel: PropTypes.string,
        customStyle: PropTypes.shape({
          main: PropTypes.object,
          sub: PropTypes.object
        })
      }),
      cell: {
        value: PropTypes.any,
        id: PropTypes.string,
        style: PropTypes.any,
        others: PropTypes.object,
        type: PropTypes.string
      }
    })
  )
}

export default React.memo(TableAction)
