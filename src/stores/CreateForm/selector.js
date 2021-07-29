import { withArray, withEmpty, withNumber, withObject } from 'exp-value'
import { selector } from 'recoil'
import { globalModulesState, globalSectionState } from './atom'

export const addModule = selector({
  key: 'CreateForm/add-module',
  set: ({ get, set }) => {
    const modules = get(globalModulesState)
    let temp = [
      ...modules,
      {
        title: '',
        description: '',
        sections: []
      }
    ]
    set(globalModulesState, temp)
  }
})

export const updateModule = selector({
  key: 'CreateForm/update-module',
  set: ({ get, set }, data) => {
    if (typeof data.index === 'undefined' || !data.temp) return
    const module = withObject('temp', data)
    const id = withNumber('index', data)
    const modules = get(globalModulesState)
    let temp = [...modules]
    temp[id] = module
    set(globalModulesState, temp)
  }
})

export const removeModule = selector({
  key: 'CreateForm/remove-module',
  set: ({ get, set }, idModule) => {
    const modules = get(globalModulesState)
    let temp = [...modules]
    temp.splice(idModule, 1)
    set(globalModulesState, temp)
  }
})

export const addSection = selector({
  key: 'CreateForm/add-section',
  set: ({ get, set }, idModule) => {
    const modules = get(globalModulesState)
    const module = JSON.parse(JSON.stringify(modules))

    let temp = [
      ...withArray('sections', modules[idModule]),
      {
        title: '',
        description: '',
        sectionItems: [],
        inputTypeId: 'multiple_choice'
      }
    ]
    set(globalSectionState, temp)
    module[idModule].sections = temp
    set(globalModulesState, module)
  }
})

export const updateSection = selector({
  key: 'CreateForm/update-section',
  set: ({ get, set }, data) => {
    if (
      typeof data.index === 'undefined' ||
      typeof data.orderNumber === 'undefined' ||
      !data.temp
    )
      return
    const idModule = withNumber('index', data)
    const idSection = withNumber('orderNumber', data)
    const section = withArray('temp', data)

    if (
      typeof idModule === 'undefined' ||
      typeof idSection === 'undefined' ||
      !section
    ) {
      return
    }
    const modules = get(globalModulesState)
    const module = JSON.parse(JSON.stringify(modules))
    module[idModule].sections[idSection] = section
    set(globalModulesState, module)
  }
})

export const removeSection = selector({
  key: 'CreateForm/remove-section',
  set: ({ get, set }, data) => {
    if (
      typeof data.index === 'undefined' ||
      typeof data.orderNumber === 'undefined'
    )
      return
    const idModule = withNumber('index', data)
    const idSection = withNumber('orderNumber', data)
    const modules = get(globalModulesState)

    const temp = JSON.parse(JSON.stringify(modules))
    temp[idModule].sections = temp[idModule].sections.filter(
      (_, index) => index !== idSection
    )

    set(globalModulesState, temp)
  }
})

export const swapSection = selector({
  key: 'CreateForm/swap',
  set: ({ get, set }, data) => {
    const idModule = withNumber('index', data)
    const idSection = withNumber('orderNumber', data)
    const type = withEmpty('type', data)

    const modules = get(globalModulesState)

    const module = JSON.parse(JSON.stringify(modules))
    const temp = module[idModule].sections

    if (type == 'up') {
      if (idSection > 0 && idSection < temp.length) {
        console.log(
          ([temp[idSection], temp[idSection - 1]] = [
            temp[idSection - 1],
            temp[idSection]
          ])
        )
      }
    }

    if (type == 'down') {
      if (idSection < temp.length - 1 && idSection >= 0)
        console.log(
          ([temp[idSection], temp[idSection + 1]] = [
            temp[idSection + 1],
            temp[idSection]
          ])
        )
    }

    module[idModule].sections = temp
    set(globalModulesState, module)
  }
})

export const addSectionItem = selector({
  key: 'CreateForm/add-sectionItem',
  set: ({ get, set }, data) => {
    const modules = get(globalModulesState)
    const idModule = data.idModule
    const idSection = data.idSection
    const module = JSON.parse(JSON.stringify(modules))

    module[idModule].sections[idSection].push({})

    set(globalModulesState, modules)
  }
})

export const updateSectionItem = selector({
  key: 'CreateForm/update-sectionItem',
  set: ({ get, set }, sectionItem, idModule, idSection, idSectionItem) => {
    const modules = get(globalModulesState)
    modules[idModule].sections[idSection].sectionItems[
      idSectionItem
    ] = sectionItem
    set(globalModulesState, modules)
  }
})

export const removeSectionItem = selector({
  key: 'CreateForm/remove-sectionItem',
  set: ({ get, set }, idModule, idSection, idSectionItems) => {
    const modules = get(globalModulesState)
    modules[idModule].sections[idSection].sectionItems.splice(idSectionItems, 1)
    set(globalModulesState, modules)
  }
})
