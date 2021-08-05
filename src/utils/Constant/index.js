const Constant = {
  PaginateLengthMenu: [
    {
      value: 10,
      label: 10
    },
    {
      value: 20,
      label: 20
    }
  ],
  CellType: {
    ACTION_BUTTON_GROUP: 'ACTION_BUTTON_GROUP',
    ACTION_CELL: 'ACTION_CELL',
    IMAGE: 'IMAGE',
    RADIO_GROUP: 'RADIO_GROUP',
    GROUP: 'GROUP',
    TOGGLE: 'TOGGLE',
    DATE_TIME: 'DATE_TIME',
    ICON_BUTTON: 'ICON_BUTTON',
    COLOR_VIA_VALUE: 'COLOR_VIA_VALUE',
    DISPLAY: 'DISPLAY'
  },
  Status: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'in_active' }
  ],
  Role: [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Staff', value: 'STAFF' }
  ],
  CellColor: {
    ACTIVE: 'active',
    INACTIVE: 'in_active'
  },
  sectionShare: [
    {
      value: 'general',
      label: 'General'
    },
    {
      value: 'private',
      label: 'Private'
    }
  ],
  Languages: [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: 'Japanese',
      value: 'jp'
    }
  ],
  sectionType: [
    {
      value: 'single_choice',
      label: 'Single choice'
    },
    {
      value: 'multiple_choice',
      label: 'Multiple choice'
    },
    {
      value: 'image',
      label: 'Image'
    },
    {
      value: 'text',
      label: 'Text input'
    },
    {
      value: 'number',
      label: 'Number input'
    }
  ],
  unit: [
    {
      value: 'general',
      label: 'General'
    },
    {
      value: 'private',
      label: 'Private'
    }
  ],

  displayMode: [
    {
      value: 'auto',
      label: 'auto'
    },
    {
      value: 'manual',
      label: 'manual'
    },
    {
      value: 'hide',
      label: 'hide'
    }
  ],
  DEFAULT_OPTIONS: [
    {
      value: 'auto',
      label: 'auto'
    },
    {
      value: 'manual',
      label: 'manual'
    },
    {
      value: 'hidden',
      label: 'hide'
    }
  ],
  LOGIN_ROLE: [
    { value: 'agency', label: 'Agency' },
    { value: 'admin', label: 'Admin' }
  ]
}

export default Constant
