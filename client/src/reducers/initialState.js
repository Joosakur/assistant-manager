export default {
  entities: {
    employer: undefined,
    assistants: {},
    workShifts: {},
    workShiftsByAssistant: {},
    workShiftsByStartDate: {} // key format YYYY-MM-DD
  },
  auth: {
    token: undefined,
    authenticating: false
  },
  pages: {
    verification: {
      loading: false,
      error: null
    },
    assistants: {
      loading: false,
      assistantDialog: {
        open: false,
        assistantId: null
      }
    },
    schedule: {
      loading: false,
      workShiftDialog: {
        open: false,
        workShiftId: null
      },
      copiedDay: null
    },
    reporting: {
      polling: false,
      downloadLink: null
    }
  }
}
