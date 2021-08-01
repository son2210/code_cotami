const EndPoint = {
  LOGIN_API: 'auth/login',
  REGISTER_API: 'admins/register',
  ADMIN_PROFILE: 'users/profile',
  STAFFS: 'staffs',
  UNITS_LIST: id => `enterprises/${id}/units`,
  UPDATE_STAFFS: 'users',
  RESULT_LOGS: 'results/changeLogs',
  FORM_CREATE: 'forms/create',
  GET_FORM: 'forms'
}

export default EndPoint
