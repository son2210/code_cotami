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
  HrWrapper
} from './styled'

import { Constant } from 'utils'

const TableAction = ({
  hasPaginate = true,
  hasSummary = false,
  paginateProps,
  data,
  width,
  columns,
  ...others
}) => {
  const headerSummary = (main, sub, index, customStyle) => {
    const firstCol = index === 0 ? true : false
    return (
      <div>
        <MainHeaderCellWrapper H6>
          <span style={{ ...customStyle?.main }}>{main}</span>
        </MainHeaderCellWrapper>
        <SubHeaderWrapper style={{ ...customStyle?.sub }} firstCol={firstCol}>
          {sub}
        </SubHeaderWrapper>
      </div>
    )
  }

  return (
    <Wrapper>
      {hasSummary && <HrWrapper style={{ width: width }}></HrWrapper>}
      <TableWrapper
        width={width}
        headerHeight={hasSummary ? 60 : 35}
        data={data}
        {...others}
      >
        {columns.map((col, index) => (
          <ColumnWrapper align='left' width={col?.width || 60} key={index}>
            <HeaderCellWrapper
              style={
                (col.header.style && col.header.style) || { paddingLeft: 10 }
              }
            >
              {hasSummary
                ? headerSummary(col.header.label, col.header.subLabel, index)
                : col.header.label}
            </HeaderCellWrapper>
            <CellWrapper
              minWidth={50}
              minHeight={50}
              onClick={col.cell.onClick}
              style={col.cell.style}
            >
              {col.cell.value}
            </CellWrapper>
          </ColumnWrapper>
        ))}
      </TableWrapper>

      {hasPaginate && (
        <PaginationWrapper
          lengthMenu={
            paginateProps?.lengthMenu
              ? paginateProps.lengthMenu
              : Constant.paginateLengthMenu
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
        onClick: PropTypes.func,
        style: PropTypes.any
      }
    })
  )
}

export default React.memo(TableAction)
