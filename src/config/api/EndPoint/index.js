const EndPoint = {
  LOGIN_API: 'auth/login/admin',
  REGISTER_API: 'users/register',
  ADMIN_PROFILE: 'users/profile',
  ADMIN_RESET_PASSWORD: 'auth/resetPassword',
  STAFFS: 'staffs',
  UNITS_LIST: id => `enterprises/${id}/units`,
  UPDATE_STAFFS: 'users',
  RESULT_LOGS: 'results/changeLogs',
  FORM_CREATE: 'forms/create',
  FORMS: 'forms',
  CHECK_IN_REQ: id => `enterpriseUnits/${id}/forms/checkInRequests`,
  UPDATE_CHECK_IN_REQ: (unit, form) =>
    `/enterpriseUnits/${unit}/forms/${form}/checkInRequests`
}

export default EndPoint
