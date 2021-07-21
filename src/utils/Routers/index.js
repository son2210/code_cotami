const Routers = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password/:token',
  FORGOT_PASSWORD: '/forgot-password',
  NORMAL_ADMIN: {
    MENU: [
      {
        URL: '/admin/dashboard',
        NAME: 'Dashboard'
      },
      {
        URL: '/admin/statistics',
        NAME: 'Statistics'
      },
      {
        URL: '/admin/history-management',
        NAME: 'History management'
      },
      {
        URL: '/admin/check-in-request-management',
        NAME: 'Check in request management'
      },
      {
        URL: '/admin/checklist-management',
        NAME: 'Checklist management'
      },
      {
        URL: '/admin/staff-management',
        NAME: 'Staff management'
      }
    ],

    CHECKLIST: {
      URL: '/admin/checklist-management',
      NAME: 'Checklist management',
      CHILD: [
        {
          URL: '/admin/checklist-management/create',
          NAME: 'Create a checklist'
        },
        {
          URL: '/admin/checklist-management/template',
          NAME: 'Templates management'
        }
      ]
    },

    PROFILE: {
      URL: '/admin/profile',
      NAME: 'Profile',
      CHILD: [
        {
          URL: '/admin/profile/change-password',
          NAME: 'Change password'
        },
        {
          URL: '/admin/profile/update',
          NAME: 'Update password'
        }
      ]
    }
  },
  SUPER_ADMIN: {
    MENU: [
      {
        URL: '/super-admin/templates-management',
        NAME: 'Templates Managements'
      },
      {
        URL: '/super-admin/companies',
        NAME: 'Companies managements'
      },
      {
        URL: '/super-admin/account',
        NAME: 'Accounts managements'
      },
      {
        URL: '/super-admin/system-logs',
        NAME: 'System logs'
      },
      {
        URL: '/super-admin/payment',
        NAME: 'Payment System'
      }
    ]
  },

  PREVIEWS: '/previews'
}

export default Routers
