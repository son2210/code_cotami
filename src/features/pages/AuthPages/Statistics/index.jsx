import React, { useState, useEffect, useCallback } from 'react' // useState
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseDateRangePicker, BaseInputPicker } from 'atoms'

import { IMAGES } from 'assets'
import { usePaginate } from 'hooks'
import { Constant } from 'utils'
import { useRequestManager, useUnits } from 'hooks'
import { EndPoint } from 'config/api'
import { globalUnitsState } from 'stores/Units/atom'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import { withArray } from 'exp-value'

const Statistics = () => {
  const {
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()
  useUnits()

  const { onGetExecute } = useRequestManager()
  const units = useRecoilValue(globalUnitsState)
  const [forms, setForms] = useState([])
  const [column, setColumn] = useState([])
  const [data, setData] = useState([])

  const [searchData, setSearchData] = useState(
    {
      enterpriseUnitId: null,
      dateRange: [
        dayjs().subtract(30, 'days').startOf('day').utc().format(),
        dayjs().endOf('day').utc().format()
      ],
      formId: null
      // formId: 280 // just one available
    },
    []
  )

  const getForms = useCallback(async () => {
    const response = await onGetExecute(
      EndPoint.FORMS,
      {
        params: {
          offset: 0,
          limit: 1000
        }
      },
      true
    )

    if (response) {
      return withArray('data', response).map(f => {
        return { ...f, label: f.title, value: f.id }
      })
    }
  })

  const getFormsResults = useCallback(
    (offset, limit, dateRange, enterpriseUnitId, formId) => {
      // if (formId) return []
      return onGetExecute(EndPoint.FORMS_RESULTS(formId), {
        params: {
          offset,
          limit,
          enterpriseUnitId,
          startDate: dayjs(dateRange[0]).utc().format(),
          endDate: dayjs(dateRange[1]).utc().format()
        }
      })
    },
    []
  )
  const getFormsProgress = useCallback(
    (offset, limit, dateRange, enterpriseUnitId, formId) => {
      // if (formId) return []
      return onGetExecute(EndPoint.FORMS_RESULTS_PROGRESS(formId), {
        params: {
          offset,
          limit,
          enterpriseUnitId,
          startDate: dayjs(dateRange[0]).utc().format(),
          endDate: dayjs(dateRange[1]).utc().format()
        }
      })
    },
    []
  )

  const dataTransform = useCallback((progress, results) => {
    if (!progress || !results) return { column: [], data: [] }
    const columnIds = progress.map(c => c.sectionId)
    let column = [
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
      ...progress.map(p => {
        let cellType = null
        let customStyle = {}
        switch (p.inputTypeId) {
          case Constant.sectionType[0].value: // single choice
            cellType = Constant.CellType.IMAGE
            break
          case Constant.sectionType[2].value: //image
            cellType = Constant.CellType.IMAGE
            customStyle = {
              width: 100,
              align: 'center',
              cellStyle: {
                padding: 0
              },
              cellOthersStyles: {
                width: 46,
                height: 27,
                borderRadius: 4,
                padding: 0
              }
            }
            break
          case Constant.sectionType[3].value: // text
            customStyle = {
              width: 300
            }
            break
        }
        return {
          width: customStyle?.width || 100,
          align: customStyle?.align || 'center',
          header: {
            subLabel: `${p.progress * 100}%`,
            label: p.title,
            style: { ...customStyle?.headerStyle }
          },
          cell: {
            id: p.sectionId,
            type: cellType,
            others: {
              ...customStyle?.cellOthersStyles
            },
            style: { ...customStyle?.cellStyle }
          }
        }
      })
    ]
    let data = []
    results.forEach(result => {
      let row = {
        name: `${result?.author?.firstName} ${result?.author?.lastName}`
      }
      columnIds.forEach(id => {
        row[id] = ''
      })
      // todo with empty
      result.resultItems.forEach(item => {
        let { inputTypeId, id } = item.section
        let { imageUrl, text, number } = item.value
        switch (inputTypeId) {
          case Constant.sectionType[0].value: // single choice
            row[id] = IMAGES.LOGO.CHECKED
            break
          case Constant.sectionType[2].value: //
            row[id] = imageUrl
            break
          case Constant.sectionType[3].value: //image
            row[id] = number
            break
          case Constant.sectionType[4].value: //image
            row[id] = text
            break
        }
      })
      data.push(row)
    })

    return { data, column }
  }, [])

  const getData = useCallback(
    (offset, limit, dateRange, enterpriseUnitId, formId) => {
      Promise.all([
        getFormsProgress(offset, limit, dateRange, enterpriseUnitId, formId),
        getFormsResults(offset, limit, dateRange, enterpriseUnitId, formId)
      ])
        .then(conCurrentData => {
          const [progress, results] = conCurrentData
          const { column, data } = dataTransform(progress.data, results.data)
          setColumn(column)
          setData(data)
        })
        .catch(error => console.log(error))
    },
    []
  )

  useEffect(() => {
    async function execute() {
      const listForm = await getForms()
      if (listForm?.length * units?.length !== 0) {
        setForms(listForm)
        setSearchData({
          formId: listForm[0].value,
          enterpriseUnitId: units[0].value
        })
        getData(
          activePage - 1,
          displayLength,
          searchData.dateRange,
          units[0].value,
          // 280 // just one available
          listForm[0].value
        )
      }
    }
    execute()
  }, [])

  useEffect(() => {
    if (searchData.enterpriseUnitId && searchData.formId) {
      getData(
        activePage - 1,
        displayLength,
        searchData.dateRange,
        searchData.enterpriseUnitId,
        searchData.formId
        // 280 // just one available
      )
    }
  }, [activePage, displayLength, units])

  return (
    <Wrapper>
      <FilterBar
        placeholder='checklist'
        hasButton={false}
        style={{ marginBottom: 20 }}
        formOpt={{
          formValue: searchData,
          onSubmit: () => {
            getData(
              0,
              displayLength,
              searchData.dateRange,
              searchData.enterpriseUnitId,
              searchData.formId
              // 280 // just one available
            )
          }
        }}
      >
        <BaseInputPicker
          placeholder='unit'
          style={{ marginLeft: 10 }}
          value={searchData['enterpriseUnitId']}
          data={units}
          onChange={v =>
            setSearchData(prev => {
              return { ...prev, ['enterpriseUnitId']: v }
            })
          }
        />
        <BaseInputPicker
          placeholder='Form'
          style={{ marginLeft: 10 }}
          data={forms}
          value={searchData['formId']}
          onChange={v =>
            setSearchData(prev => {
              return { ...prev, ['formId']: v }
            })
          }
        />
        <BaseDateRangePicker
          placeholder='Select date range'
          style={{ marginLeft: 10 }}
          onChange={range =>
            setSearchData(prev => {
              const date = [
                dayjs(range[0]).startOf('day').utc().format(),
                dayjs(range[1]).endOf('day').utc().format()
              ]
              return { ...prev, ['dateRange']: date }
            })
          }
          value={searchData['dateRange']}
        />

        <BaseButton type='submit' style={{ marginLeft: 10 }} secondary bold>
          Filter
        </BaseButton>
      </FilterBar>

      <TableAction
        virtualized
        height={window.innerHeight - 200}
        data={data}
        columns={column}
        hasSummary={true}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage: page => onChangePage(page),
          onChangeLength: length => onChangeLength(length)
        }}
      />
    </Wrapper>
  )
}

export default Statistics
