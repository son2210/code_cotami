import { Schema } from 'rsuite'
const { StringType } = Schema.Types

const validateModel = Schema.Model({
  firstName: StringType().isRequired('firstName is required'),
  lastName: StringType().isRequired('lastName is required')
})

export default validateModel
