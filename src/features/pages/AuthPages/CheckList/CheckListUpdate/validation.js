import { Schema } from 'rsuite'
const { StringType } = Schema.Types

export const formCheckListUpdate = Schema.Model({
  title: StringType().isRequired('Title is required field'),
  description: StringType().isRequired('Description is required field'),
  displayMode: StringType().isRequired('Display mode is required field')
})
