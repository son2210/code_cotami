import React from 'react'
import PropTypes from 'prop-types'
import {
  TableWrapper,
  CellWrapper,
  HeaderCellWrapper,
  Wrapper,
  ColumnWrapper,
  PaginationWrapper
} from './styled'

const TableAction = ({
  hasPaginate=true,
  paginateProps,
  data,
  columns,
  ...others
}) => {
  return (
    <Wrapper>
      <TableWrapper data={data} {...others}>
        {columns.map((col, index) => (
          <ColumnWrapper width={200} key={index}>
            <HeaderCellWrapper
              minWidth={200}
              style={col.header.style && col.header.style}
            >
              {col.header.label}
            </HeaderCellWrapper>
            <CellWrapper
              minWidth={200}
              onClick={col.cell.onClick}
              style={col.cell.style && col.cell.style}
            >
              {col.cell.value}
            </CellWrapper>
          </ColumnWrapper>
        ))}
      </TableWrapper>

      {hasPaginate && (
        <PaginationWrapper
          lengthMenu={paginateProps.lengthMenu}
          activePage={paginateProps.activePage}
          displayLength={paginateProps.displayLength}
          total={paginateProps.total}
          onChangePage={paginateProps.onChangePage}
          onChangeLength={paginateProps.onChangeLength}
        />
      )}
    </Wrapper>
  )
}

TableAction.propTypes = {
  hasPaginate: PropTypes.bool,
  paginateProps: PropTypes.shape({
    lengthMenu: PropTypes.number,
    total: PropTypes.number,
    activePage: PropTypes.number,
    displayLength: PropTypes.number,
    onChangeLength: PropTypes.func,
    onChangePage: PropTypes.func
  }),
  data: PropTypes.any,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.shape({
        label: PropTypes.string,
        style: PropTypes.any
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
