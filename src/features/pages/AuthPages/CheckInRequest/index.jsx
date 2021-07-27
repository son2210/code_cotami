import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  Wrapper,
  ModalWrapper,
  ModalContentWrapper,
  ModalInputWrapper,
  ModalButtonWrapper
} from './styled'
import { TableAction, FilterBar } from 'molecules'
import { BaseButton, BaseDatePicker, BaseCheckPicker } from 'atoms'
import { usePaginate } from 'hooks'
import { useTheme } from 'styled-components'
import { Constant } from 'utils'

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
  const modalRef = useRef(null)
  const modalInputRef = useRef(null)

  const [cell, setCell] = useState()
  const [modal, setModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false)
        setCell('')
      }
    }
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        setModal(false)
        // todo  update data
      }
    }
    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.remoteEventListener('keypress', handleKeyPress)
    }
  }, [modalRef])

  const getOffSet = useCallback((event, rowData, id) => {
    setModalPosition({ x: event.pageX - 20, y: event.pageY - 20 })
    setCell(rowData[id])
    setModal(true)
  }, [])

  const handleCellInput = useCallback(value => {
    setCell(value)
  }, [])

  const columns = [
    {
      width: 200,
      header: {
        label: 'Date'
      },
      cell: {
        id: 'date',
        type: Constant.CellType.DATE_TIME
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        label: 'Checklist 1'
      },
      cell: {
        id: 'c1',
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
    },
    {
      align: 'left',
      width: 100,
      header: {
        label: 'Checklist 2'
      },
      cell: {
        id: 'c2',
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
    },
    {
      width: 100,
      align: 'left',
      header: {
        style: {
          textAlign: 'center'
        },
        label: 'Checklist 3'
      },
      cell: {
        id: 'c3',
        type: Constant.CellType.ACTION_CELL,
        others: {
          handleOnClick: getOffSet
        },
        style: {
          color: theme.colors.tertiary
        }
      }
    },
    {
      width: 100,
      align: 'left',
      header: {
        style: {
          textAlign: 'center'
        },
        label: 'Checklist 4'
      },
      cell: {
        id: 'c4',
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
    },
    {
      width: 100,
      align: 'left',
      header: {
        style: {
          textAlign: 'center'
        },
        label: 'Checklist 5'
      },
      cell: {
        id: 'c5',
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
              value={cell}
              onChange={handleCellInput}
            />
            <ModalButtonWrapper secondary>Save</ModalButtonWrapper>
          </ModalContentWrapper>
        </ModalWrapper>
      )}
      <FilterBar hasButton={false} style={{ marginBottom: 20 }}>
        <BaseDatePicker format='YYYY-MM' placeholder='Month' />
        <BaseCheckPicker
          data={data}
          style={{ marginLeft: 10 }}
          placeholder='Unit'
        />
        <BaseButton
          style={{ marginLeft: 10 }}
          secondary
          bold
          onClick={() => {
            setModal(!modal)
          }}
        >
          Search
        </BaseButton>
      </FilterBar>

      <TableAction
        id='table3'
        height={600}
        width={700}
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
    date: '2021/07/14',
    c1: 32,
    c2: 23,
    c3: 33,
    c4: 5,
    c5: 20
  },
  {
    date: '2021/07/15',
    c1: 32,
    c2: 23,
    c3: 33,
    c4: 5,
    c5: 20
  },
  {
    date: '2020/12/15',
    c1: 32,
    c2: 23,
    c3: 33,
    c4: 5,
    c5: 20
  },
  {
    date: '2021/07/13',
    c1: 32,
    c2: 23,
    c3: 33,
    c4: 5,
    c5: 20
  },
  {
    date: '2021/07/13',
    c1: 32,
    c2: 23,
    c3: 33,
    c4: 5,
    c5: 20
  }
]

export default CheckInRequest
