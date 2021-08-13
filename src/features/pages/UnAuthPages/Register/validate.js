import { Schema } from 'rsuite'
const { StringType, ArrayType } = Schema.Types
const requireMessage = 'This field is required'

const validateRegister = Schema.Model({
  userId: StringType().isRequired(requireMessage),
  password: StringType()
    .isRequired(requireMessage)
    .minLength(8, "Can't be less than 8 characters"),
  cfPassword: StringType()
    .isRequired(requireMessage)
    .addRule((value, data) => {
      if (value != data.password) return false
      return true
    }, 'Confirm password is not match password'),
  firstName: StringType().isRequired(requireMessage),
  lastName: StringType().isRequired(requireMessage),
  email: StringType()
    .isRequired(requireMessage)
    .isEmail('Please enter the correct email'),
  phone: StringType()
    .isRequired(requireMessage)
    .addRule(value => {
      return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)
    }, 'Please enter legal phone number'),
  enterpriseId: StringType().isRequired(requireMessage),
  name: StringType().isRequired(requireMessage),
  businessCategoryId: StringType().isRequired(requireMessage),
  businessCategoryTags: ArrayType().isRequired(requireMessage),
  province: StringType().isRequired(requireMessage),
  area: StringType().isRequired(requireMessage),
  address: StringType().isRequired(requireMessage),
  website: StringType().isRequired(requireMessage),
  enterprisePhone: StringType()
    .isRequired(requireMessage)
    .addRule(value => {
      return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)
    }, 'Please enter legal phone number'),
  enterpriseEmail: StringType()
    .isRequired(requireMessage)
    .isEmail('Please enter the correct email')
})

export default validateRegister
