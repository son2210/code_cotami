import { atom } from 'recoil'

export const globalModulesState = atom({
  key: 'CreateForm/global-module-state',
  default: []
})
export const globalSectionState = atom({
  key: 'CreateForm/global-section-state',
  default: []
})
export const globalSectionItemState = atom({
  key: 'CreateForm/global-sectionItem-state',
  default: []
})
