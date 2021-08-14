import { Schema } from 'rsuite'
const { StringType } = Schema.Types

const message = 'This field is require'

const validateModel = Schema.Model({
  oldPassword: StringType().isRequired(message),
  password: StringType()
    .isRequired(message)
    .minLength(8, "Can't be less than 8 characters"),
  cfPassword: StringType()
    .isRequired(message)
    .addRule((value, data) => {
      if (value != data.password) {
        return false
      }
      return true
    }, 'Confirm password is not match password')
})

export default validateModel
