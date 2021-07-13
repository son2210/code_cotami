import React from 'react'
import { Wrapper, RowImageWrapper, LogoImageWrapper } from './styled'
import { TableAction, FilterBar, UserPicker } from 'molecules'
import { BaseButton, BaseCheckPicker, BaseDatePicker } from 'atoms'

import { IMAGES } from 'assets'
import { usePaginate } from 'hooks'

const Statistics = () => {
  const [
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  ] = usePaginate()

  const columns = [
    {
      width: 200,
      header: {
        label: '　　　　',
        style: { height: 100 },
        subLabel: 'Progress'
      },
      cell: {
        value: rowData => rowData.name
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C1'
      },
      cell: {
        // eslint-disable-next-line react/display-name
        value: () => {
          return <LogoImageWrapper source={IMAGES.LOGO.CHECKED} />
        }
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C2'
      },
      cell: {
        // eslint-disable-next-line react/display-name
        value: () => {
          return <LogoImageWrapper source={IMAGES.LOGO.MINUS} />
        }
      }
    },
    {
      width: 70,
      header: {
        subLabel: '80%',
        style: {
          textAlign: 'center'
        },
        label: 'C3'
      },
      cell: {
        // eslint-disable-next-line react/display-name
        value: rowData => {
          return <RowImageWrapper source={rowData.c3} />
        }
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C4'
      },
      cell: {
        // eslint-disable-next-line react/display-name
        value: () => {
          return <LogoImageWrapper source={IMAGES.LOGO.MINUS} />
        }
      }
    },
    {
      header: {
        subLabel: '80%',
        label: 'C5'
      },
      cell: {
        // eslint-disable-next-line react/display-name
        value: () => {
          return <LogoImageWrapper source={IMAGES.LOGO.MESSAGE} />
        }
      }
    },
    {
      width: 500,
      header: {
        subLabel: '80%',
        label: 'C6'
      },
      cell: {
        value: rowData => {
          return rowData.c6
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
        width={500}
        data={testData}
        columns={columns}
        hasSummary={true}
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
    name: 'Jadon Sancho',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
    c6: 7
  },
  {
    name: 'Marcus Rashford',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
    c6: 7
  },
  {
    name: 'Bukayo Saka',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
    c6: 7
  },
  {
    name: 'Mount  Mason',
    c1: true,
    c2: true,
    c3: IMAGES.AVATAR,
    c4: true,
    c5: true,
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
