import React from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar, UserPicker } from 'molecules'
import { BaseButton, BaseDatePicker } from 'atoms'
import { usePaginate } from 'hooks'
import { useTheme } from 'styled-components'

const History = () => {
  const [
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  ] = usePaginate()
  const theme = useTheme()

  const columns = [
    {
      align: 'left',
      width: 200,
      header: {
        label: 'Last update time'
      },
      cell: {
        id: 'update'
      }
    },
    {
      align: 'left',
      width: 100,
      header: {
        label: 'Staff'
      },
      cell: {
        id: 'staff',
        style: {
          color: theme.colors.tertiary
        }
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        label: 'Checklist'
      },
      cell: {
        id: 'checklist',
        style: {
          color: theme.colors.tertiary
        }
      }
    },
    {
      width: 100,
      align: 'center',
      header: {
        style: {
          textAlign: 'center'
        },
        label: 'Action'
      },
      cell: {
        id: 'action',
        style: {
          color: theme.colors.tertiary
        }
      }
    }
  ]

  return (
    <Wrapper>
      <FilterBar hasButton={false} style={{ marginBottom: 20 }}>
        <BaseDatePicker style={{ marginLeft: 10 }} />
        <UserPicker
          style={{ marginLeft: 10 }}
          data={userPicker}
          placeholder={'Select user'}
        />
        <BaseButton style={{ marginLeft: 10 }} secondary bold>
          Filter
        </BaseButton>
      </FilterBar>

      <TableAction
        height={600}
        width={550}
        data={testData}
        columns={columns}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage,
          onChangeLength,
          lengthMenu: [
            {
              value: 10,
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ]
        }}
      />
    </Wrapper>
  )
}

//Moc data

const testData = [
  {
    update: '2021/06/25 09:21',
    staff: 'Salad',
    checklist: 'Check list 1',
    action: 'Update'
  },
  {
    update: '2021/06/25 09:21',
    staff: 'Mane',
    checklist: 'Check list 1',
    action: 'Update'
  },
  {
    update: '2021/06/25 09:21',
    staff: 'Firmino',
    checklist: 'Check list 1',
    action: 'Update'
  },
  {
    update: '2021/06/25 09:21',
    staff: 'Trend',
    checklist: 'Check list 1',
    action: 'Update'
  },
  {
    update: '2021/06/25 09:21',
    staff: 'Alision',
    checklist: 'Check list 1',
    action: 'Update'
  }
]

const userPicker = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Kariane',
    value: 'Kariane'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Louisa',
    value: 'Louisa'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Marty',
    value: 'Marty'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Kenya',
    value: 'Kenya'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Hal',
    value: 'Hal'
  },
  {
    url:
      'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_UY1200_CR106,0,630,1200_AL_.jpg',
    label: 'Julius',
    value: 'Julius'
  }
]

export default History
