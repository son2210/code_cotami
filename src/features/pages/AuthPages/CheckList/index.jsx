import React, { useState, useCallback } from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseCheckPicker, BaseInput, BaseInputPicker } from 'atoms'
import { usePaginate } from 'hooks'
import { useTheme } from 'styled-components'
import { Constant } from 'utils'

import { modifyPropsOfState } from 'utils/Helpers'
import { IMAGES } from 'assets'

const CheckList = () => {
  const [
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  ] = usePaginate()
  const theme = useTheme()

  const [searchTerm, setSearchTerm] = useState({
    name: '',
    display: '',
    status: ''
  })
  const handleInput = useCallback(
    (name, value) => {
      modifyPropsOfState(searchTerm, setSearchTerm, name, value)
    },
    [data]
  )

  const columns = [
    {
      width: 100,
      header: {
        label: 'Date'
      },
      cell: {
        id: 'id',
        style: {
          color: theme.colors.secondary[1]
        }
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        label: 'Checklist 1'
      },
      cell: {
        id: 'name',
        style: {
          color: theme.colors.secondary[1]
        }
      }
    },
    {
      width: 300,
      align: 'center',
      header: {
        label: 'Display'
      },
      cell: {
        type: Constant.CellType.DISPLAY,
        id: 'displayMode',
        isCheckbox: true
      }
    },
    {
      width: 100,
      header: {
        label: 'Presentation'
      },
      cell: {
        type: Constant.CellType.ICON_BUTTON,
        others: {
          label: ' Config',
          source: IMAGES.LOGO.MONITOR,
          style: {
            width: 20,
            height: 20
          }
        }
      }
    },
    {
      width: 200,
      align: 'left',
      header: {
        style: {
          textAlign: 'center'
        },
        label: 'Action'
      },
      cell: {
        type: Constant.CellType.ACTION_BUTTON_GROUP,
        others: {}
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
      <FilterBar style={{ marginBottom: 20, width: '70%' }}>
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
          onChange={value => handleInput('email', value)}
          value={data['email']}
        />
        <BaseCheckPicker
          data={data}
          style={{ marginLeft: 10 }}
          placeholder='Unit'
        />
        <BaseInputPicker
          data={data}
          style={{ marginLeft: 10, maxWidth: 170 }}
          placeholder='Unit'
        />

        <BaseButton
          style={{ marginLeft: 10 }}
          secondary
          bold
          onClick={() => {
            null
          }}
        >
          Search
        </BaseButton>
      </FilterBar>
      <TableAction
        id='table3'
        height={600}
        width={800}
        data={testData}
        columns={columns}
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
    id: 1,
    name: 'checklist 1',
    displayMode: 'auto'
  },
  {
    id: 2,
    name: 'checklist 1',
    displayMode: 'manual'
  },
  {
    id: 3,
    name: 'checklist 1',
    displayMode: 'hide'
  },
  {
    id: 4,
    name: 'checklist 1',
    displayMode: 'auto'
  }
]

export default CheckList
