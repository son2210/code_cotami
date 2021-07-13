import { useState } from 'react'

const usePaginate = () => {
  const [activePage, setActivePage] = useState(1)
  const [displayLength, setDisplayLength] = useState(10)
  const [total, setTotal] = useState(0)
  const onChangePage = page => {
    setActivePage(page)
  }

  const onChangeLength = length => {
    setDisplayLength(length)
  }

  return [
    activePage,
    displayLength,
    total,
    setTotal,
    onChangePage,
    onChangeLength
  ]
}

export default usePaginate
