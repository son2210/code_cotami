// import { useCallback, useEffect, useState } from 'react'
// import { globalModulesState } from 'stores/CreateForm'
// import { useRecoilValue } from 'recoil'
// import { withArray } from 'exp-value'

const useModules = () => {
  // const modules = useRecoilValue(globalModulesState)
  // const [error, ] = useState(null)
  // const handleError = useCallback(modules => {
  //   console.log(modules, 'module')
  //   if (modules.length < 1) return { message: ' No module' }
  //   const temp = modules.map((module, index) => {
  //     console.log(module.title == '', index)
  //     if (module.title == '') return { message: `Module ${index + 1} no title` }
  //     if (!module.description)
  //       return {
  //         message: `Module ${index + 1} no description`
  //       }
  //     if (module.sections.length < 1)
  //       return {
  //         message: `Section of module ${index + 1} is empty`
  //       }
  //     withArray('sections', module).map((section, order) => {
  //       if (!section.title)
  //         return {
  //           message: `Section ${order + 1} of module ${index + 1} no title`
  //         }
  //       if (!section.description)
  //         return {
  //           message: `Section ${order + 1} of module ${
  //             index + 1
  //           } no description`
  //         }
  //       if (
  //         (section.inputTypeId == 'multiple_choice' ||
  //           section.inputTypeId == 'multiple_choice') &&
  //         section.sectionItems.length < 1
  //       )
  //         return {
  //           message: `Section ${order + 1} of module ${
  //             index + 1
  //           } no section items`
  //         }
  //     })
  //   })
  //   temp
  //   // console.log(error, 'deqlkwjnfdlmnwq flewkf,mqnw fewqkjkjnnmn ;oiojh ')
  //   // return error
  // }, [])
  // // useEffect(handleError, [modules])
  // return { handleError }
}

export default useModules
