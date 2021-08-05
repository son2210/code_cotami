// import React from 'react'

// import { useRecoilValue } from 'recoil'
// import { useRequestManager } from 'hooks'
// import { EndPoint } from 'config/api'
// import { globalUserState } from 'stores/profile/atom'
// import { globalUnitsState } from 'stores/Units/atom'
// import { useSetRecoilState } from 'recoil'

// // Check Had new units
// // waiting API
const useUnits = () => {
  //   const setUnitsState = useSetRecoilState(globalUnitsState)
  //   const admin = useRecoilValue(globalUserState)
  //   const { onGetExecute } = useRequestManager()
  //   React.useEffect(() => {
  //     async function execute(offset, limit) {
  //       const response = await onGetExecute(
  //         EndPoint.UNITS_LIST(admin.enterpriseId),
  //         {
  //           params: { offset, limit }
  //         }
  //       )
  //       if (response && response.length) {
  //         setUnitsState(
  //           response.map(u => {
  //             return { ...u, label: u.name, value: u.id }
  //           })
  //         )
  //       }
  //     }
  //     execute()
  //   }, [])
  //   return { admin }
}

export default useUnits
