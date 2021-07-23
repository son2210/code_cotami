import React from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar, UserPicker } from 'molecules'
import { BaseButton, BaseCheckPicker, BaseDatePicker } from 'atoms'

import { IMAGES } from 'assets'
import { usePaginate } from 'hooks'
import { Constant } from 'utils'

const Statistics = () => {
  const {
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()

  const columns = [
    {
      width: 200,
      header: {
        label: '　　　　',
        style: { height: 100 },
        subLabel: 'Progress'
      },
      cell: {
        id: 'name'
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C1'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'c1'
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C2'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'c2'
      }
    },
    {
      width: 100,
      align: 'center',
      header: {
        subLabel: '80%',
        label: 'C3'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'c3',
        style: {
          padding: 0
        },
        others: {
          style: {
            width: 46,
            height: 27,
            borderRadius: 4,
            padding: 0
          }
        }
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C4'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'c4'
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C5'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'c5'
      }
    },
    {
      width: 40,
      header: {
        subLabel: '80%',
        label: 'C6'
      },
      cell: {
        id: 'c6'
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
      label: '川'
    }
  ]

  return (
    <Wrapper>
      <FilterBar hasButton={false} style={{ marginBottom: 20 }}>
        <BaseCheckPicker data={data} />
        <BaseDatePicker style={{ marginLeft: 10 }} />
        <UserPicker style={{ marginLeft: 10 }} data={userPicker} />
        <BaseButton style={{ marginLeft: 10 }} secondary bold>
          Filter
        </BaseButton>
      </FilterBar>

      <TableAction
        height={600}
        width={700}
        data={testData}
        columns={columns}
        hasSummary={true}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage,
          onChangeLength
        }}
      />
    </Wrapper>
  )
}

//Moc data

const testData = [
  {
    name: 'Jadon Sancho',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
  },
  {
    name: 'Marcus Rashford',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
  },
  {
    name: 'Bukayo Saka',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: IMAGES.LOGO.CHECKED,
    c2: IMAGES.LOGO.MINUS,
    c3: IMAGES.AVATAR,
    c4: IMAGES.LOGO.MINUS,
    c5: IMAGES.LOGO.MESSAGE,
    c6: 7
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

export default Statistics
