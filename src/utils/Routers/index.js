const Routers = {
  DASHBOARD: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password/:token',
  FORGOT_PASSWORD: '/forgot-password',
  NORMAL_ADMIN: {
    MENU: [
      {
        URL: '/dashboard',
        NAME: 'dashboard'
      },
      {
        URL: '/statistics',
        NAME: 'statistics'
      },
      {
        URL: '/history-management',
        NAME: 'history-management'
      },
      {
        URL: '/check-in-request-management',
        NAME: 'check-in-request-management'
      },
      {
        URL: '/checklist-management',
        NAME: 'checklist-management'
      },
      {
        URL: '/staff-management',
        NAME: 'staff-management'
      },
      {
        URL: '/account-management',
        NAME: 'account-management'
      }
    ],

    CHECKLIST: {
      URL: '/checklist-management',
      NAME: 'Checklist management',
      CHILD: [
        {
          URL: '/checklist-management/checklist-create',
          NAME: 'Create a checklist'
        },
        {
          URL: '/checklist-management/checklist-update',
          NAME: 'Update a checklist'
        }
      ]
    },

    PROFILE: {
      URL: '/profile',
      NAME: 'Profile',
      CHILD: [
        {
          URL: '/profile/change-password',
          NAME: 'Change password'
        },
        {
          URL: '/profile/update-profile',
          NAME: 'Update password'
        }
      ]
    },

    ACCOUNT: {
      URL: '/account-management',
      NAME: 'Checklist management',
      CHILD: [
        {
          URL: '/account-management/create',
          NAME: 'Create a account'
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
