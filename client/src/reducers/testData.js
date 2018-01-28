const testState = {
  entities: {
    employer: {
      id: 'e001',
      email: 'test@test.com',
      firstName: 'Testy',
      lastName: 'McTestface',
      birthday: '1990-01-07',
      hetaMember: true,
      city: 'Helsinki'
    },
    assistants: {
      'a001': {
        id: 'a001',
        email: 'help@gmail.com',
        firstName: 'Helpy',
        lastName: 'Helbie',
        nickName: 'Big H',
        backgroundColor: '#282684',
        textColor: '#ffffff',
        exportedUntil: '2017-12-29'
      },
      'a002': {
        id: 'a002',
        email: 'aid@gmail.com',
        firstName: 'Andy',
        lastName: 'Ant',
        backgroundColor: '#688684',
        textColor: '#000000',
        exportedUntil: '2017-12-27'
      }
    },
    workShifts: {
      'ws001': {
        id: 'ws001',
        assistantId: 'a001',
        start: '2017-12-01T09:00:00',
        end: '2017-12-01T16:30:00',
        sick: false
      },
      'ws002': {
        id: 'ws002',
        assistantId: 'a001',
        start: '2017-12-02T17:00:00',
        end: '2017-12-02T23:00:00',
        sick: true
      },
      'ws003': {
        id: 'ws003',
        assistantId: 'a002',
        start: '2017-12-01T23:00:00',
        end: '2017-12-02T09:00:00',
        sick: false
      },
      'ws004': {
        id: 'ws004',
        assistantId: 'a002',
        start: '2017-12-03T17:00:00',
        end: '2017-12-03T24:00:00',
        sick: false
      }
    },
    workShiftsByAssistant: {
      'a001': ['ws001', 'ws002'],
      'a002': ['ws003', 'ws004']
    }
  },

  // page reducers
  registration: {},
  verification: {},
  login: {},
  assistants: {},
  schedule: {},
  reports: {},

  // 3rd party
  router: {},
  toastr: {},
  forms: {},
  locale: {
    languages: [],
    translations: {},
    options: {
      renderInnerHtml: true,
      showMissingTranslationMsg: true,
      missingTranslationMsg: 'Missing translation key ${ key } for language ${ code }'
    }
  }
}

export {
  testState
}
