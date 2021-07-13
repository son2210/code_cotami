import React from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseCheckPicker } from 'atoms'

// import { IMAGES } from 'assets'

const testData = [
  { checkListName: 'checklist1', timestamp: '13/2/2002' },
  { checkListName: 'checklist1', timestamp: '13/2/2002' }
]

const Dashboard = () => {
  const columns = [
    {
      width: 100,
      header: {
        label: 'Checklist name'
      },
      cell: {
        value: rowData => rowData.checkListName
      }
    },
    {
      width: 100,
      header: {
        label: 'Last update time'
      },
      cell: {
        value: rowData => {
          console.log(testData.indexOf(rowData))
          return rowData.timestamp
        }
      }
    }
  ]

  const data = [
    {
      value: '1',
      label: '四川'
    },
    {
      value: '2',
      label: '四川'
    }
  ]

  return (
    <Wrapper>
      <FilterBar hasButton={false} style={{ marginBottom: 20 }}>
        <BaseCheckPicker data={data} />
        <BaseButton style={{ marginLeft: 10 }} secondary bold>
          Filter
        </BaseButton>
      </FilterBar>
      <TableAction
        width={400}
        data={testData}
        columns={columns}
        hasPaginate={false}
        // paginateProps={{
        //   activePage: 1,
        //   displayLength: 10,
        //   total: 100,
        //   onChangePage: num => console.log(num),
        //   onChangeLength: num => console.log(num)
        // }}
      />
    </Wrapper>
  )
}

export default Dashboard
