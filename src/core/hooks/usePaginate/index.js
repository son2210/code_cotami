import { useState, useCallback } from 'react'

const usePaginate = () => {
  const [activePage, setActivePage] = useState(1)
  const [displayLength, setDisplayLength] = useState(10)
  const [total, setTotal] = useState(0)
  const onChangePage = useCallback((page, setLoading) => {
    setLoading(true)
    setActivePage(page)
  }, [])

  const onChangeLength = useCallback((length, setLoading) => {
    setLoading(true)
    setDisplayLength(length)
  }, [])

  return {
    activePage,
    displayLength,
    total,
    setTotal,
    onChangePage,
    onChangeLength
  }
}

export default usePaginate
