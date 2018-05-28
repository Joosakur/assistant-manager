import { runSaga } from 'redux-saga'
import nock from 'nock'

import initialState from '../reducers/initialState'
import { handleListAssistants } from './assistants'
import {API} from '../constants/urls'
import {ASSISTANT1, ASSISTANT2} from '../test/data/assistants'
import { setupAxiosForTests } from '../test/testUtils'
import {listAssistantsSuccess} from '../actions/api/assistantActions'

describe('assistants saga', () => {
  let dispatched, io
  setupAxiosForTests()
  const TOKEN = 'some-access-token'

  beforeEach(() => {
    dispatched = []
    io = {
      dispatch: action => {
        dispatched.push(action)
      },
      getState: () => ({
        ...initialState,
        auth: {
          ...initialState.auth,
          token: TOKEN
        }
      })
    }
  })

  describe('listAssistants', () => {
    it('should get assistants from api and save them to store', async () => {
      // given
      const mockApi = nock(API.origin).get(API.assistants)
        .reply(200, [ASSISTANT1, ASSISTANT2])

      // when
      await runSaga(io, handleListAssistants).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(listAssistantsSuccess([ASSISTANT1, ASSISTANT2]))
      mockApi.done()
    })
  })
})
