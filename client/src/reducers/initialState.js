export default {
  entities: {
    employer: undefined,
    assistants: {},
    workShifts: {},
    workShiftsByAssistant: {}
  },
  auth: {
    token: undefined,
    authenticating: false
  },
  pages: {
    registration: undefined,
    verification: undefined,
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
      }
    },
    reports: undefined,
  }
}
