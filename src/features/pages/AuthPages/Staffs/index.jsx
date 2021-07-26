/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseCheckPicker, BaseInput, BaseInputPicker } from 'atoms'
import { usePaginate, useRequestManager, useAlert } from 'hooks'
import { useTheme } from 'styled-components'
import { Constant } from 'utils'
import { modifyPropsOfState, trimStringFieldOfObject } from 'utils/Helpers'
import { StaffModal } from 'organisms'
import { EndPoint } from 'config/api'
import { withNamespaces } from 'react-i18next'
import { PropTypes } from 'prop-types'

const Staffs = ({ t }) => {
  const {
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  } = usePaginate()
  const theme = useTheme()
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

  // ===========================================
  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

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

  // =========================================================
  
  const toggleModal = useCallback((e, rowData) => {
    setSelectedRow(rowData)
    setDisplayStaff(rowData)
    setProfileModal(true)
  }, [])

  const updateProfile = useCallback(async () => {
    const submitData = trimStringFieldOfObject(selectedRow)
    const response = await onPatchExecute(
      `${EndPoint.UPDATE_STAFFS}/${selectedRow.id}`,
      submitData
    )
    if (response) {
      getData(activePage, displayLength)
      showSuccess('update success')
    }
    setTimeout(() => {
      setProfileModal(false)
    }, 500)
  }, [selectedRow])

  const getData = async (offset, limit) => {
    const response = await onGetExecute(EndPoint.STAFFS, {
      params: { offset, limit }
    })
    if (response) {
      setData(response)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData(activePage, displayLength)
  }, [activePage, displayLength])

  const columns = [
    {
      width: 100,
      align: 'center',
      header: {
        label: 'Avatar'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'avatarUrl',
        isAvatar: true,
        hoverPointer: true,
        style: {
          color: theme.colors.secondary[1],
          paddingTop: 5,
          height: 65
        },
        others: {
          style: {
            width: 35,
            height: 35,
            borderRadius: '50%'
          },
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 100,
      align: 'center',
      header: {
        label: 'First Name'
      },

      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'firstName',
        style: {
          color: theme.colors.secondary[1]
        },
        others: {
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        label: 'Last Name'
      },

      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'lastName',
        style: {
          color: theme.colors.secondary[1]
        },
        others: {
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 200,
      align: 'left',
      header: {
        label: 'email'
      },
      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'email',
        style: {
          color: theme.colors.tertiary
        },
        others: {
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 80,
      align: 'left',
      header: {
        label: 'Role'
      },
      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'role',
        style: {
          color: theme.colors.tertiary
        },
        others: {
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 80,
      align: 'left',
      header: {
        label: 'Status'
      },
      cell: {
        hoverPointer: true,
        id: 'status',
        type: Constant.CellType.COLOR_VIA_VALUE,
        others: {
          handleOnClick: toggleModal
        }
      }
    },
    {
      width: 80,
      align: 'left',
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
    }
  ]

  //mock
  const pickerData = [
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
      <FilterBar hasButton={false} style={{ marginBottom: 20, width: '70%' }}>
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
          onChange={value => handleInputSearch('email', value)}
          value={searchTerm['email']}
        />
        <BaseCheckPicker
          data={pickerData}
          style={{ marginLeft: 10 }}
          placeholder='Unit'
        />
        <BaseInputPicker
          data={pickerData}
          style={{ marginLeft: 10, maxWidth: 170 }}
          placeholder='Status'
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
        id='table3'
        loading={loading}
        height={600}
        width={800}
        data={data}
        columns={columns}
        onRowClick={data => {
          console.log('onRowClick')
          console.log(data)
        }}
        paginateProps={{
          activePage,
          displayLength,
          total: 100, // hard code
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

Staffs.propTypes = {
  t: PropTypes.any
}

export default withNamespaces('menu')(Staffs)
