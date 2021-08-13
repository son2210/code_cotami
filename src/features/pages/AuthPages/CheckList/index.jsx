import { IMAGES } from 'assets'
import { BaseButton, BaseInputPicker, BaseInput, BaseCheckPicker } from 'atoms'
import { EndPoint } from 'config/api'
import { usePaginate, useRequestManager } from 'hooks'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Constant, Routers } from 'utils'
import { FilterWrapper, Table, Wrapper } from './styled'
import { globalUnitsState } from 'stores/Units/atom'
import { useRecoilValue } from 'recoil'
import { withArray, withNumber } from 'exp-value'
import { modifyPropsOfState } from 'utils/Helpers'

const CheckList = () => {
  const {
    activePage,
    total,
    setTotal,
    displayLength,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const theme = useTheme()
  const history = useHistory()
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState({
    name: '',
    enterpriseUnitIds: [],
    status: null
  })
  const { onGetExecute } = useRequestManager()
  const units = useRecoilValue(globalUnitsState)

  const columns = useMemo(() => {
    return [
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
  }, [])

  const filterStatus = useMemo(() => {
    return [
      {
        label: 'Active',
        value: 'active'
      },
      {
        label: 'In Active',
        value: 'in_active'
      }
    ]
  }, [])

  const handleInputSearch = useCallback(
    (name, value) => {
      modifyPropsOfState(searchData, setSearchData, name, value)
    },
    [searchData]
  )
  const getData = useCallback((offset, limit, others) => {
    const params = { offset: offset, limit: limit, ...others }
    async function execute() {
      const response = await onGetExecute(EndPoint.FORMS, {
        params: params
      })
      if (response) {
        setData(withArray('data', response))
        setTotal(withNumber('paging.total', response))
      }
      setLoading(false)
    }
    execute()
  }, [])

  const goToCreateChecklist = useCallback(() => {
    history.push(Routers.NORMAL_ADMIN.CHECKLIST.CHILD[0].URL)
  }, [])

  const filterChecklist = useCallback(() => {
    const { name, enterpriseUnitIds, status } = searchData
    let temp = {}
    if (name) temp = { ...temp, name: name }
    if (enterpriseUnitIds)
      temp = { ...temp, enterpriseUnitIds: enterpriseUnitIds }
    if (status) temp = { ...temp, status: status }
    getData(0, displayLength, temp)
  }, [searchData, displayLength])

  useEffect(() => {
    getData(activePage - 1, displayLength)
  }, [activePage, displayLength])

  return (
    <Wrapper>
      <FilterWrapper
        formOpt={{
          formValue: searchData,
          onSubmit: () => filterChecklist()
        }}
        onClick={goToCreateChecklist}
      >
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
          value={searchData['name']}
          onChange={v => handleInputSearch('name', v === '' ? null : v)}
        />
        <BaseCheckPicker
          placeholder='units'
          style={{ marginLeft: 10 }}
          data={units}
          defaultValue={searchData['enterpriseUnitIds']}
          onChange={v => {
            setSearchData(prev => {
              return { ...prev, ['enterpriseUnitIds']: v }
            })
          }}
        />
        <BaseInputPicker
          placeholder='status'
          style={{ marginLeft: 10 }}
          onChange={v => handleInputSearch('status', v)}
          data={filterStatus}
        />
        <BaseButton style={{ marginLeft: 10 }} secondary bold type={'submit'}>
          Search
        </BaseButton>
      </FilterWrapper>

      <Table
        id='table__checklist-forms'
        height={window.innerHeight - 200}
        data={data}
        loading={loading}
        columns={columns}
        paginateProps={{
          activePage: activePage - 1,
          displayLength,
          total: total,
          onChangePage: page => onChangePage(page),
          onChangeLength: length => onChangeLength(length)
        }}
      />
    </Wrapper>
  )
}

export default CheckList
