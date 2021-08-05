import React, { useState, useCallback, useEffect } from 'react'
import { Wrapper } from './styled'
import PropTypes from 'prop-types'

const UserListPicker = ({ data, ...others }) => {
  const [listUser, setListUser] = useState([])
  const loadUser = useCallback(() => {
    setListUser(fake)
  }, [])
  useEffect(() => {
    setListUser(data)
  }, [data])
  return <Wrapper data={listUser} {...others} block onOpen={loadUser} />
}

UserListPicker.propTypes = {
  others: PropTypes.any,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      id: PropTypes.string
    })
  )
}

export default React.memo(UserListPicker)
const fake = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: 'Kariane',
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  },
  {
    label: 'Marty',
    value: 'Marty',
    role: 'Master'
  },
  {
    label: 'Kenya',
    value: 'Kenya',
    role: 'Master'
  },
  {
    label: 'Hal',
    value: 'Hal',
    role: 'Developer'
  },
  {
    label: 'Julius',
    value: 'Julius',
    role: 'Developer'
  },
  {
    label: 'Travon',
    value: 'Travon',
    role: 'Developer'
  },
  {
    label: 'Vincenza',
    value: 'Vincenza',
    role: 'Developer'
  },
  {
    label: 'Dominic',
    value: 'Dominic',
    role: 'Developer'
  },
  {
    label: 'Pearlie',
    value: 'Pearlie',
    role: 'Guest'
  },
  {
    label: 'Tyrel',
    value: 'Tyrel',
    role: 'Guest'
  },
  {
    label: 'Jaylen',
    value: 'Jaylen',
    role: 'Guest'
  },
  {
    label: 'Rogelio',
    value: 'Rogelio',
    role: 'Guest'
  }
]
