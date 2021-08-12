/* eslint-disable no-unused-vars */
import { BaseButton, BaseInput, BaseInputPicker } from 'atoms'
import { EndPoint } from 'config/api'
import { useAlert, usePaginate, useRequestManager } from 'hooks'
import { FilterBar, TableAction } from 'molecules'
import { StaffModal } from 'organisms'
import { PropTypes } from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Constant, Routers } from 'utils'
import { modifyPropsOfState, trimStringFieldOfObject } from 'utils/Helpers'
import { Wrapper } from './styled'
import { withArray, withNumber } from 'exp-value'

const Accounts = ({ t }) => {
  const {
    activePage,
    displayLength,
    total,
    setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const theme = useTheme()
  const history = useHistory()
  const { showSuccess } = useAlert()
  const { onGetExecute, onPatchExecute } = useRequestManager()
  const [profileModal, setProfileModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [displayStaff, setDisplayStaff] = useState({
    email: '',
    firstName: '',
    lastName: ''
  })
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    display: '',
    status: ''
  })

  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInput = useCallback(
    (name, value) => {
      modifyPropsOfState(error, setError, name, '')
      modifyPropsOfState(selectedRow, setSelectedRow, name, value)
    },
    [selectedRow, error]
  )

  const validateData = useCallback(err => {
    let newError = { ...error }
    for (const [key, value] of Object.entries(err)) {
      newError[key] = value
    }
    setError(newError)
  }, [])

  const handleInputSearch = useCallback((name, value) => {
    modifyPropsOfState(searchTerm, setSearchTerm, name, value)
  }, [])

  const toggleModal = useCallback((e, rowData) => {
    setSelectedRow(rowData)
    setDisplayStaff(rowData)
    setProfileModal(true)
  }, [])

  const onRowClick = useCallback((e, data) => {
    setSelectedRow(data)
    setDisplayStaff(data)
    setProfileModal(true)
  }, [])

  const updateProfile = useCallback(async () => {
    const submitData = trimStringFieldOfObject(selectedRow)
    const response = await onPatchExecute(
      `${EndPoint.ACCOUNTS}/${selectedRow.id}`,
      submitData
    )
    if (response) {
      // getData(activePage, displayLength)
      showSuccess('update success')
    }
    setTimeout(() => {
      setProfileModal(false)
    }, 500)
  }, [selectedRow])

  const getData = async (offset, limit) => {
    const response = await onGetExecute(EndPoint.ACCOUNTS, {
      params: { offset, limit }
    })
    debugger
    if (response) {
      setData(withArray('data', response))
      setTotal(withNumber('paging.total', response))
    }
    setLoading(false)
  }

  useEffect(() => {
    getData(activePage, displayLength)
  }, [activePage, displayLength])

  const columns = [
    {
      width: 100,
      align: 'left',
      header: {
        label: 'id'
      },
      cell: {
        id: 'id'
      }
    },
    {
      width: 160,
      align: 'left',
      header: {
        label: 'Name'
      },

      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'firstName',
        style: {
          color: theme.colors.secondary[1]
        },
        // others: {
        //   handleOnClick: toggleModal
        // }
      }
    },
    {
      width: 160,
      align: 'left',
      header: {
        label: 'Role'
      },
      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'role',
        hiddenEye: true,
        style: {
          color: theme.colors.tertiary
        },
        // others: {
        //   handleOnClick: toggleModal
        // }
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        label: 'Status'
      },
      cell: {
        hoverPointer: true,
        id: 'status',
        type: Constant.CellType.COLOR_VIA_VALUE,
        // others: {
        //   handleOnClick: toggleModal
        // }
      }
    },
    {
      width: 100,
      align: 'center',
      header: {
        label: 'Active'
      },
      cell: {
        id: 'status',
        type: Constant.CellType.TOGGLE
        // others: {
        //   handleOnChange: handleOnChange
        // }
      }
    },
    {
      width: 100,
      align: 'center',
      header: {
        label: 'Action'
      },
      cell: {
        id: 'status',
        type: Constant.CellType.ACTION_BUTTON_GROUP,
        others: {
          hiddenEye: true
        }
      }
    }
  ]

  const pickerData = [
    {
      value: '1',
      label: 'Admin'
    },
    {
      value: '2',
      label: 'Agency'
    },
    {
      value: '3',
      label: 'Sys Admin'
    }
  ]
  const goToPage = useCallback(route => history.push(route), [])

  return (
    <Wrapper>
      <FilterBar
        onClick={() => goToPage(Routers.SUPER_ADMIN.ACCOUNTS.CHILD[0].URL)}
        hasButton={true}
        style={{ marginBottom: 20, width: '70%' }}
      >
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
          onChange={value => handleInputSearch('firstName', value)}
          value={searchTerm['firstName']}
        />
        <BaseInputPicker
          data={pickerData}
          style={{ marginLeft: 10, maxWidth: 170 }}
          placeholder='Role'
          cleanable={false}
        />

        <BaseButton
          style={{ marginLeft: 10 }}
          secondary
          bold
          onClick={() => {
            setProfileModal(true)
          }}
        >
          Search
        </BaseButton>
      </FilterBar>
      <TableAction
        id='table--accounts'
        loading={loading}
        height={window.innerHeight - 120}
        width={'100%'}
        data={data}
        columns={columns}
        onRowClick={data => {
          onRowClick(data)
        }}
        paginateProps={{
          activePage,
          displayLength,
          total: total,
          onChangePage: page => onChangePage(page, setLoading),
          onChangeLength: length => onChangeLength(length, setLoading)
        }}
      />

      <StaffModal
        size='xs'
        show={profileModal}
        staffData={{ handleInput, data: selectedRow, error }}
        viewOnlyData={{ dataDisplay: displayStaff }}
        onHide={() => setProfileModal(false)}
        footerHandle={{
          onClickBtn1: () => setProfileModal(false),
          onClickBtn2: updateProfile
        }}
        formOthers={{
          formTitle: 'update profile',
          onCheck: validateData
        }}
      />
    </Wrapper>
  )
}

Accounts.propTypes = {
  t: PropTypes.any
}

export default withNamespaces('menu')(Accounts)
