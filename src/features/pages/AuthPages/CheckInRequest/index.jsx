import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  Wrapper,
  ModalWrapper,
  ModalContentWrapper,
  ModalInputWrapper,
  ModalButtonWrapper
} from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseDateRangePicker, BaseInputPicker } from 'atoms'
import { usePaginate, useRequestManager } from 'hooks'
import { useTheme } from 'styled-components'
import { Constant } from 'utils'
import moment from 'moment'
import { EndPoint } from 'config/api'
import { globalUnitsState } from 'stores/Units/atom'
import { useRecoilValue } from 'recoil'

const CheckInRequest = () => {
  const {
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const theme = useTheme()
  // useUnits()
  const [data, setData] = useState([])
  const units = useRecoilValue(globalUnitsState)
  const [currentUnit, setCurrentUnit] = useState()
  const modalRef = useRef(null)
  const modalInputRef = useRef(null)
  const [cell, setCell] = useState({ row: null, id: null, value: '' })
  const [modal, setModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false)
        setCell({ row: null, id: null })
      }
    }
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        updateCell(cell, currentUnit)
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [modalRef])
  // ====================
  const getOffSet = useCallback((event, rowData, id) => {
    setModalPosition({ x: event.pageX - 20, y: event.pageY - 20 })
    setCell({ row: rowData, id, value: rowData[id] })
    setModal(true)
  }, [])

  const handleCellInput = useCallback(value => {
    setCell(prev => {
      return { ...prev, value }
    })
  }, [])

  // ====================
  const { onGetExecute, onPostExecute } = useRequestManager()
  const [searchData, setSearchData] = useState({
    enterpriseUnitId: null,
    dateRange: [
      moment(Date.now()).subtract(30, 'days').format('YYYY-MM-DD'),
      moment(Date.now()).format('YYYY-MM-DD')
    ]
  })
  const [columns, setColumns] = useState([])

  const getForms = useCallback((offset, limit, enterpriseUnitId) => {
    return onGetExecute(EndPoint.FORMS, {
      params: {
        offset,
        limit,
        enterpriseUnitId
      }
    })
  }, [])
  const getCheckIn = useCallback(
    (offset, limit, dateRange, enterpriseUnitId) => {
      return onGetExecute(EndPoint.CHECK_IN_REQ(enterpriseUnitId), {
        params: {
          offset,
          limit,
          enterpriseUnitId,
          startDate: moment(dateRange[0]).format('YYYY-MM-DD'),
          endDate: moment(dateRange[1]).format('YYYY-MM-DD')
        }
      })
    },
    []
  )

  //Call 3 apis  and transform  with opacity  O(n^3) is not good way but i have no idea
  const transformData = useCallback((forms, checkIn) => {
    let columId = forms.map(f => {
      return f.id
    })

    let columns = [
      {
        width: 200,
        header: {
          label: 'Date'
        },
        cell: {
          id: 'targetDate',
          type: Constant.CellType.DATE_TIME
        }
      },
      ...forms.map(f => {
        return {
          width: 100,
          align: 'left',
          header: {
            label: f.title
          },
          cell: {
            id: f.id,
            type: Constant.CellType.ACTION_CELL,
            others: {
              handleOnClick: getOffSet,
              style: {
                width: '40%'
              }
            },
            style: {
              color: theme.colors.tertiary
            }
          }
        }
      })
    ]
    let data = []
    checkIn.forEach(checkInItem => {
      let row = {
        targetDate: checkInItem.targetDate
      }
      columId.forEach(column => {
        row[column] = 0
      })
      if (
        checkInItem.checkinRequests &&
        checkInItem.checkinRequests.length !== 0
      ) {
        checkInItem.checkinRequests.forEach(checkInRq => {
          row[checkInRq.form.id] = checkInRq.requestAmount
        })
        // row = { ...row, checkinRequests: checkInItem.checkinRequests }
      }
      data.push(row)
    })
    return { columns, data }
  }, [])

  const getData = useCallback((offset, limit, dateRange, enterpriseUnitId) => {
    Promise.all([
      getForms(offset, limit, enterpriseUnitId),
      getCheckIn(offset, limit, dateRange, enterpriseUnitId)
    ])
      .then(conCurrentData => {
        const [form, checkIn] = conCurrentData
        const { columns, data } = transformData(form, checkIn)
        setColumns(columns)
        setData(data)
      })
      .catch(err => console.log(err))
  }, [])

  const updateCell = useCallback(async (cell, unit) => {
    const { row, id, value } = cell
    await onPostExecute(
      EndPoint.UPDATE_CHECK_IN_REQ(unit, id),
      {
        params: {
          requestAmount: value,
          targetDate: row['targetDate']
        }
      },
      true
    )
    setModal(false)
  }, [])

  //initial
  useEffect(() => {
    if (units && units.length) {
      setSearchData(prev => {
        return { ...prev, enterpriseUnitId: units[0].value }
      })
      setCurrentUnit(units[0].value)
      getData(activePage, displayLength, searchData.dateRange, units[0].value)
    }
  }, [activePage, displayLength, units])

  return (
    <Wrapper>
      {modal && (
        <ModalWrapper>
          <ModalContentWrapper
            style={{
              top: modalPosition.y,
              left: modalPosition.x
            }}
            ref={modalRef}
          >
            <ModalInputWrapper
              ref={modalInputRef}
              value={cell['value']}
              onChange={handleCellInput}
            />
            <ModalButtonWrapper
              onClick={() => updateCell(cell, currentUnit)}
              secondary
            >
              Save
            </ModalButtonWrapper>
          </ModalContentWrapper>
        </ModalWrapper>
      )}
      <FilterBar
        hasButton={false}
        style={{ marginBottom: 20 }}
        formOpt={{
          formValue: searchData,
          onSubmit: () => {
            getData(
              activePage,
              displayLength,
              searchData.dateRange,
              searchData.enterpriseUnitId
            )
          }
        }}
      >
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
        <BaseDateRangePicker
          placeholder='Select date range'
          style={{ marginLeft: 10 }}
          onChange={v =>
            setSearchData(prev => {
              return { ...prev, ['dateRange']: v }
            })
          }
          //fix warning Rsuit
          value={
            searchData['dateRange'].length
              ? [
                  new Date(searchData['dateRange'][0]),
                  new Date(searchData['dateRange'][1])
                ]
              : []
          }
        />

        <BaseButton style={{ marginLeft: 10 }} secondary bold type='submit'>
          Search
        </BaseButton>
      </FilterBar>

      <TableAction
        virtualized
        id='table3'
        height={600}
        data={data}
        columns={columns}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage: page => onChangePage(page - 1),
          onChangeLength: length => onChangeLength(length)
        }}
      />
    </Wrapper>
  )
}

export default CheckInRequest
