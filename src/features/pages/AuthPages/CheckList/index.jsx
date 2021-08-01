import { IMAGES } from 'assets'
import { BaseButton, BaseInputPicker, BaseInput } from 'atoms'
import { EndPoint } from 'config/api'
import { usePaginate, useRequestManager, useUnits } from 'hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Constant, Routers } from 'utils'
import { FilterWrapper, Table, Wrapper } from './styled'

const CheckList = () => {
  const {
    activePage,
    displayLength,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const theme = useTheme()
  const history = useHistory()
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState({
    name: '',
    display: '',
    status: ''
  })
  const { onGetExecute } = useRequestManager()
  const units = useUnits(activePage, displayLength)

  const getData = useCallback((offset, limit) => {
    async function execute() {
      const response = await onGetExecute(EndPoint.GET_FORM, {
        params: {
          offset,
          limit
        }
      })
      if (response && response.length) {
        setData(
          response.map(d => {
            console.log(d)
            return d
          })
        )
      }
    }
    execute()
  }, [])

  useEffect(() => {
    if (units && units.length) {
      getData(activePage, displayLength, units[0].value)
      setSearchData(prev => {
        return { ...prev, enterpriseUnitId: units[0].value }
      })
    }
  }, [activePage, displayLength, units])

  const goToCreateChecklist = useCallback(() => {
    history.push(Routers.NORMAL_ADMIN.CHECKLIST.CHILD[0].URL)
  }, [])

  useEffect(() => {
    if (units && units.length) {
      getData(activePage, displayLength, searchData.dateRange, units[0].value)
      setSearchData(prev => {
        return { ...prev, enterpriseUnitId: units[0].value }
      })
    }
  }, [activePage, displayLength, units])

  const columns = [
    {
      width: 100,
      header: {
        label: 'ID'
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
        label: 'Name'
      },
      cell: {
        id: 'title',
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

  return (
    <Wrapper>
      <FilterWrapper
        formOpt={{
          formValue: searchData,
          onSubmit: () =>
            getData(
              activePage,
              displayLength,
              searchData.dateRange,
              searchData.enterpriseUnitId
            )
        }}
        onClick={goToCreateChecklist}
      >
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
        />
        <BaseInputPicker
          placeholder='unit'
          style={{ marginLeft: 10 }}
          data={units}
          value={searchData['enterpriseUnitId']}
          onChange={v =>
            setSearchData(prev => {
              return { ...prev, ['enterpriseUnitId']: v }
            })
          }
        />
        <BaseInputPicker
          placeholder='unit'
          style={{ marginLeft: 10 }}
          data={['active', 'inactive']}
        />
        <BaseButton
          style={{ marginLeft: 10 }}
          secondary
          bold
          onClick={() => {}}
        >
          Search
        </BaseButton>
      </FilterWrapper>

      <Table
        id='table__checklist-forms'
        height={window.innerHeight - 300}
        data={data}
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

export default CheckList
