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
import { globalUnitsState } from 'stores/Units/atom'
import { useRecoilValue } from 'recoil'

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
  // useUnits()
  const units = useRecoilValue(globalUnitsState)
  const { showSuccess } = useAlert()
  const { onGetExecute, onPatchExecute, onPostExecute } = useRequestManager()
  const [profileModal, setProfileModal] = useState({
    toggle: false,
    isUpdate: false
  })
  const [selectedRow, setSelectedRow] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: ''
  })
  const [displayStaff, setDisplayStaff] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: ''
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
    setProfileModal({
      toggle: true,
      isUpdate: true
    })
  }, [])

  const updateProfile = useCallback(
    async (selectedRow, disableLoading = false) => {
      const submitData = trimStringFieldOfObject(selectedRow)
      const response = await onPatchExecute(
        `${EndPoint.UPDATE_STAFFS}/${selectedRow.id}`,
        submitData,
        disableLoading
      )
      if (response) {
        getData(activePage, displayLength, disableLoading)
        showSuccess('update success')
      }
      setTimeout(() => {
        setProfileModal(false)
      }, 500)
    },
    []
  )

  // const createProfile = useCallback(async () => {
  //   console.log('create')
  // }, [])

  const createProfile = async (selectedRow, disableLoading = false) => {
    const submitData = trimStringFieldOfObject(selectedRow)
    const response = await onPostExecute(
      `${EndPoint.REGISTER_API}`,
      submitData,
      disableLoading
    )
    if (response) {
      getData(activePage, displayLength, disableLoading)
      showSuccess('update success')
    }
    setTimeout(() => {
      setProfileModal(false)
    }, 500)
  }

  const toggleStatus = useCallback(async (value, e, row) => {
    const staffData = {
      ...row,
      status: value ? Constant.CellColor.ACTIVE : Constant.CellColor.INACTIVE
    }
    await updateProfile(staffData, true)
  }, [])

  const getData = async (offset, limit, disableLoading = false) => {
    const response = await onGetExecute(
      EndPoint.STAFFS,
      {
        params: { offset, limit }
      },
      disableLoading
    )
    if (response) {
      setData(response)
    }
    setLoading(false)
  }

  const onCloseModal = useCallback(() => {
    setProfileModal(prev => {
      return { ...prev, toggle: false }
    })
    setSelectedRow({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: ''
    })
    setDisplayStaff({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: ''
    })
  }, [])

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
      width: 150,
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
      width: 150,
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
      width: 100,
      align: 'left',
      header: {
        label: 'Birthday'
      },
      cell: {
        type: Constant.CellType.DATE_TIME,
        id: 'dateOfBirth',
        style: {
          color: theme.colors.tertiary
        },
        others: {
          handleOnClick: toggleModal,
          format: 'YYYY/MM/DD'
        }
      }
    },
    // {
    //   width: 80,
    //   align: 'left',
    //   header: {
    //     label: 'Role'
    //   },
    //   cell: {
    //     type: Constant.CellType.ACTION_CELL,
    //     id: 'role',
    //     style: {
    //       color: theme.colors.tertiary
    //     },
    //     others: {
    //       handleOnClick: toggleModal
    //     }
    //   }
    // },
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
        label: 'Toggle'
      },
      cell: {
        id: 'status',
        type: Constant.CellType.TOGGLE,
        others: {
          handleOnChange: toggleStatus
        }
      }
    }
  ]

  return (
    <Wrapper>
      <FilterBar
        hasButton={true}
        style={{ marginBottom: 20, width: '70%' }}
        onClick={() =>
          setProfileModal({
            toggle: true,
            isUpdate: false
          })
        }
      >
        <BaseInput
          style={{ maxWidth: 170 }}
          placeholder='Keyword...'
          name='searchTerm'
          onChange={value => handleInputSearch('email', value)}
          value={searchTerm['email']}
        />
        <BaseCheckPicker
          data={units}
          style={{ marginLeft: 10 }}
          placeholder='Unit'
        />
        <BaseInputPicker
          data={Constant.Status}
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
        width={900}
        data={data}
        columns={columns}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage: page => onChangePage(page, setLoading),
          onChangeLength: length => onChangeLength(length, setLoading)
        }}
      />

      <StaffModal
        size='xs'
        isUpdate={profileModal.isUpdate}
        show={profileModal.toggle}
        units={units}
        staffData={{ handleInput, data: selectedRow, error }}
        viewOnlyData={{ dataDisplay: displayStaff }}
        onHide={onCloseModal}
        footerHandle={{
          onClickBtn1: onCloseModal,
          onClickBtn2: profileModal.isUpdate
            ? () => updateProfile(selectedRow)
            : () => createProfile(selectedRow)
        }}
        formOthers={{
          formTitle: 'staff profile',
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
