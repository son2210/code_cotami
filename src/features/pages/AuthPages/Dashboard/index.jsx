import React from 'react'
import { Wrapper } from './styled'
import { TableAction, TableActionButton } from 'molecules'
import { BaseIcon, BaseImage } from 'atoms'

import { IMAGES } from 'assets'

const testData = [
  { checkListName: 'checklist1', timestamp: '13/2/2002' },
  { checkListName: 'checklist1', timestamp: '13/2/2002' }
]

const Dashboard = () => {
  const columns = [
    {
      header: {
        label: ' '
      },
      cell: {
        value: rowData => rowData.checkListName
      }
    },
    {
      header: {
        label: 'time stame'
      },
      cell: {
        value: rowData => {
          console.log(testData.indexOf(rowData))
          return rowData.timestamp
        }
      }
    }
    // {
    //   header: {
    //     label: 'Action'
    //   },
    //   cell: {
    //     value: rowData => <TableActionButton></TableActionButton>
    //   }
    // }
  ]

  console.log(IMAGES.EYE)
  return (
    <Wrapper>
      <TableActionButton />
      {/* <BaseIcon icon="eye"/> */}
      {/* <Eye></Eye> */}
      <img src={IMAGES.EYE} />
      <BaseImage source={IMAGES.EYE}></BaseImage>
      {/* <Eye/> */}
      <TableAction
        data={testData}
        columns={columns}
        hasPaginate={false}
        paginateProps={{
          lengthMenu: [
            {
              value: 10,
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ],
          activePage: 1,
          displayLength: 2,
          total: 10,
          onChangePage: () => null,
          onChangeLength: () => null
        }}
      />
    </Wrapper>
  )
}

export default Dashboard
