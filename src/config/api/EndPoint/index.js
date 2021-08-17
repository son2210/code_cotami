const EndPoint = {
  LOGIN_AGENCY: 'auth/login/agency',
  LOGIN_ADMIN: 'auth/login/admin',
  REGISTER_API: 'users/register/admin/self',
  ADMIN_PROFILE: 'users/profile',
  RESET_PASSWORD: 'auth/resetPassword',
  ADMIN_RESET_PASSWORD: 'auth/resetPassword',
  STAFFS: 'staffs',
  ACCOUNTS: 'accounts',
  UNITS_LIST: id => `enterprises/${id}/units`,
  UPDATE_STAFFS: 'users',
  RESULT_LOGS: 'results/changeLogs',
  FORM_CREATE: 'forms/create',
  FORMS: 'forms',
  GET_FORM: formId => `/forms/${formId}`,
  UPDATE_FORM: formId => `/forms/${formId}`,
  FORMS_RESULTS: id => `forms/${id}/results`,
  FORMS_RESULTS_PROGRESS: id => `forms/${id}/results/progress`,
  CHECK_IN_REQ: id => `enterpriseUnits/${id}/forms/checkInRequests`,
  UPDATE_CHECK_IN_REQ: (unit, form) =>
    `enterpriseUnits/${unit}/forms/${form}/checkInRequests`,
  TEMPLATE_LIST: 'templates'
}

export default EndPoint
