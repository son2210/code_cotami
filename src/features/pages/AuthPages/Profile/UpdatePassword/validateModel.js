import { Schema } from 'rsuite'
const { StringType } = Schema.Types

const validateModel = Schema.Model({
  oldPassword:StringType().isRequired('Old Password is required'),
  password: StringType()
    .minLength(8, "Can't be less than 8 characters")
    .isRequired('Password is required'),
  cfPassword: StringType().addRule((value, data) => {
    if (value != data.password) {
      return false
    }
    return true
  }, 'Confirm password is not match password')
})

export default validateModel
