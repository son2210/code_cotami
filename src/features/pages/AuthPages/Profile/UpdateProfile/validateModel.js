import { Schema } from 'rsuite'
const { StringType } = Schema.Types

const validateModel = Schema.Model({
  firstName: StringType().isRequired('First  name is required'),
  lastName: StringType().isRequired('Last name is required'),
  phone: StringType().isRequired('Phone is required')
})

export default validateModel
