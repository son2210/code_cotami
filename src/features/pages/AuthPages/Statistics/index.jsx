import React from 'react' // useState
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseDateRangePicker, BaseInputPicker } from 'atoms'

import { IMAGES } from 'assets'
import { usePaginate } from 'hooks'
import { Constant } from 'utils'

// import { EndPoint } from 'config/api'
import { globalUnitsState } from 'stores/Units/atom'
import { useRecoilValue } from 'recoil'

const Statistics = () => {
  const {
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const units = useRecoilValue(globalUnitsState)
  // const { onGetExecute } = useRequestManager()

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

  return (
    <Wrapper>
      <FilterBar
        placeholder='checklist'
        hasButton={false}
        style={{ marginBottom: 20 }}
      >
        <BaseDateRangePicker
          placeholder='select date range'
          style={{ marginLeft: 10 }}
        />

        <BaseInputPicker
          placeholder='unit'
          style={{ marginLeft: 10 }}
          data={units}
          onChange={v => console.log(v)}
        />

        <BaseButton
          // onClick={() => getUnits(activePage, displayLength)}
          type='submit'
          style={{ marginLeft: 10 }}
          secondary
          bold
        >
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

export default Statistics
