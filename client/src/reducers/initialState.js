export default {
  entities: {
    assistants: {

    },
    workShifts: {

    },
    workShiftsByStartDate: {

    }
  },
  assistants: {
    loading: false,
    editing: false,
    submitting: false
  },
  schedule: {
    loading: false,
    submitting: false,
    editing: false,
    target: null,
    copiedDay: null
  },
  registration: {
    loading: false
  },
  verification: {
    loading: false,
    error: undefined
  },
  login: {
    loading: false,
    authenticated: false,
    token: '',
    userData: undefined
  },
  reporting: {
    submitting: false,
    polling: false,
    downloadLink: undefined
  }

};
