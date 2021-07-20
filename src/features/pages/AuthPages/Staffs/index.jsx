/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import { Wrapper } from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseCheckPicker, BaseInput, BaseInputPicker } from 'atoms'
import { usePaginate } from 'hooks'
import { useTheme } from 'styled-components'
import { Constant } from 'utils'

import { modifyPropsOfState } from 'utils/Helpers'
import { IMAGES } from 'assets'
import StaffModal from '../../../organisms/StaffModal'

const Staffs = () => {
  const [
    activePage,
    displayLength,
    // total,
    // setTotal,
    onChangePage,
    onChangeLength
  ] = usePaginate()
  const theme = useTheme()

  const [profileModal, setProfileModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(false)

  const [searchTerm, setSearchTerm] = useState({
    name: '',
    display: '',
    status: ''
  })
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [error, setError] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const handleInput = useCallback(
    (name, value) => {
      modifyPropsOfState(error, setError, name, '')
      modifyPropsOfState(data, setData, name, value)
    },
    [data]
  )

  const handleInputSearch = useCallback(
    (name, value) => {
      modifyPropsOfState(searchTerm, setSearchTerm, name, value)
    },
    [data]
  )

  const toggleModal = useCallback((e, rowData) => {
    setSelectedRow(rowData)
    setProfileModal(true)
  }, [])

  const updateProfile = useCallback(() => {
    console.log('todo update')
  }, [])

  const columns = [
    {
      width: 100,
      align: 'center',
      header: {
        label: 'Avatar'
      },
      cell: {
        type: Constant.CellType.IMAGE,
        id: 'url',
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
          handleOnClick: toggleModal,
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
      header: {
        label: 'Last Name'
      },
      cell: {
        type: Constant.CellType.ACTION_CELL,
        id: 'lastName',
        others: {
          label: ' Config',
          source: IMAGES.LOGO.MONITOR,
          style: {
            width: 20,
            height: 20
          },
          others: {
            handleOnClick: toggleModal
          }
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

  // function handleOnChange (checked, e, data)  {
  //   // console.log(e)
  //   // console.log(checked)
  //   // console.log(data)
  //   console.log('toggle click')
  // }

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
        height={600}
        width={800}
        data={testData}
        columns={columns}
        onRowClick={data => {
          console.log('onRowClick')
          console.log(data)
        }}
        paginateProps={{
          activePage,
          displayLength,
          total: 100,
          onChangePage,
          onChangeLength
        }}
      />

      <StaffModal
        size='xs'
        show={profileModal}
        staffData={{ handleInput, data, error }}
        onHide={() => setProfileModal(false)}
        footerHandle={{
          onClickBtn1: () => setProfileModal(false),
          onClickBtn2: updateProfile
        }}
      />
    </Wrapper>
  )
}

//Moc data

const testData = [
  {
    url: IMAGES.AVATAR,
    firstName: 'Jacob',
    lastName: 'Nguyen',
    email: 'jacob@gmail.com',
    role: 'chef',
    status: 'active'
  },
  {
    url: IMAGES.AVATAR,
    firstName: 'Jacob',
    lastName: 'Nguyen',
    email: 'jacob@gmail.com',
    role: 'chef',
    status: 'inactive'
  },
  {
    url: IMAGES.AVATAR,
    firstName: 'Jacob',
    lastName: 'Nguyen',
    email: 'jacob@gmail.com',
    role: 'chef',
    status: 'active'
  },
  {
    url: IMAGES.AVATAR,
    firstName: 'Jacob',
    lastName: 'Nguyen',
    email: 'jacob@gmail.com',
    role: 'chef',
    status: 'inactive'
  },
  {
    url: IMAGES.AVATAR,
    firstName: 'Jacob',
    lastName: 'Nguyen',
    email: 'jacob@gmail.com',
    role: 'chef',
    status: 'inactive'
  }
]

export default Staffs
