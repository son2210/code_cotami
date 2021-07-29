import React from 'react'
import { useRecoilValue } from 'recoil'
import { useRequestManager } from 'hooks'
import { EndPoint } from 'config/api'
import { globalUserState } from 'stores/profile/atom'

const useUnits = (offset, limit) => {
  const [units, setUnits] = React.useState([])
  const admin = useRecoilValue(globalUserState)
  const { onGetExecute } = useRequestManager()
  React.useEffect(() => {
    (async (offset, limit) => {
      const response = await onGetExecute(
        EndPoint.UNITS_LIST(admin.enterpriseId),
        {
          params: { offset, limit }
        }
      )
      if (response && response.length) {
        setUnits(
          response.map(u => {
            return { ...u, label: u.name, value: u.enterpriseId }
          })
        )
      }
    })(offset, limit)
  }, [offset, limit])

  return units
}

export default useUnits
