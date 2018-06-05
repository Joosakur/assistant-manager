import { runSaga } from 'redux-saga'
import nock from 'nock'
import sinon from 'sinon'
import {toastr} from 'react-redux-toastr'
import {SubmissionError} from 'redux-form'

import initialState from '../reducers/initialState'
import { handleListAssistants, handleCreateAssistant, handleUpdateAssistant } from './assistants'
import {API} from '../constants/urls'
import {ASSISTANT1, ASSISTANT2} from '../test/data/assistants'
import { setupAxiosForTests } from '../test/testUtils'
import {
  listAssistantsSuccess, listAssistantsFail,
  createAssistantSuccess, createAssistantFail,
  updateAssistantSuccess, updateAssistantFail
} from '../actions/api/assistantActions'

describe('assistants saga', () => {
  let dispatched, io, errorToastrStub
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
    errorToastrStub = sinon.stub(toastr, 'error')
  })

  afterEach(() => {
    errorToastrStub.restore()
  })

  describe('listAssistants', () => {
    it('should get assistants from api and dispatch success', async () => {
      // given
      const mockApi = nock(API.origin)
        .get(API.assistants)
        .reply(200, [ASSISTANT1, ASSISTANT2])

      // when
      await runSaga(io, handleListAssistants).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(listAssistantsSuccess([ASSISTANT1, ASSISTANT2]))
      mockApi.done()
    })

    it('should dispatch fail and show error toast if api call fails', async () => {
      // given
      const mockApi = nock(API.origin)
        .get(API.assistants)
        .reply(503)

      // when
      await runSaga(io, handleListAssistants).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(listAssistantsFail())
      expect(errorToastrStub.calledWithMatch(sinon.match.string, sinon.match.string)).toEqual(true)
      mockApi.done()
    })
  })

  describe('createAssistant', () => {
    // given
    const form = {
      ...ASSISTANT1,
      id: undefined,
      birthday: '30.12.1950',
      textColor: undefined,
      whiteText: true
    }
    const { id, ...payload} = ASSISTANT1 // eslint-disable-line no-unused-vars

    it('should post assistant to api, resolve the promise and dispatch success', async () => {
      const meta = {
        resolve: sinon.stub(),
        reject: sinon.stub()
      }
      const mockApi = nock(API.origin)
        .post(API.assistants, payload)
        .reply(201, ASSISTANT1)

      // when
      await runSaga(io, handleCreateAssistant, { payload: form, meta }).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(createAssistantSuccess(ASSISTANT1))
      expect(meta.resolve.called).toEqual(true)
      expect(meta.reject.called).toEqual(false)
      mockApi.done()
    })

    it('should reject the promise, show error and dispatch fail if api call fails', async () => {
      const meta = {
        resolve: sinon.stub(),
        reject: sinon.stub()
      }
      const mockApi = nock(API.origin)
        .post(API.assistants, payload)
        .reply(503)

      // when
      await runSaga(io, handleCreateAssistant, { payload: form, meta }).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(createAssistantFail())
      expect(meta.resolve.called).toEqual(false)
      expect(meta.reject.called).toEqual(true)
      expect(meta.reject.args[0][0]).toEqual(new SubmissionError({_error: 'Connection error'}))
      expect(errorToastrStub.calledWithMatch(sinon.match.string, sinon.match.string)).toEqual(true)
      mockApi.done()
    })
  })


  describe('updateAssistant', () => {
    // given
    const form = {
      ...ASSISTANT1,
      assistantId: ASSISTANT1.id,
      birthday: '30.12.1950',
      textColor: undefined,
      whiteText: true
    }
    const { id, ...payload} = ASSISTANT1 // eslint-disable-line no-unused-vars

    it('should post assistant to api, resolve the promise and dispatch success', async () => {
      const meta = {
        resolve: sinon.stub(),
        reject: sinon.stub()
      }
      const mockApi = nock(API.origin)
        .put(`${API.assistants}/${ASSISTANT1.id}`, payload)
        .reply(200, ASSISTANT1)

      // when
      await runSaga(io, handleUpdateAssistant, { payload: form, meta }).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(updateAssistantSuccess(ASSISTANT1))
      expect(meta.resolve.called).toEqual(true)
      expect(meta.reject.called).toEqual(false)
      mockApi.done()
    })

    it('should reject the promise, show error and dispatch fail if api call fails', async () => {
      const meta = {
        resolve: sinon.stub(),
        reject: sinon.stub()
      }
      const mockApi = nock(API.origin)
        .put(`${API.assistants}/${ASSISTANT1.id}`, payload)
        .reply(503)

      // when
      await runSaga(io, handleUpdateAssistant, { payload: form, meta }).done

      // then
      expect(dispatched).toHaveLength(1)
      expect(dispatched[0]).toEqual(updateAssistantFail())
      expect(meta.resolve.called).toEqual(false)
      expect(meta.reject.called).toEqual(true)
      expect(meta.reject.args[0][0]).toEqual(new SubmissionError({_error: 'Connection error'}))
      expect(errorToastrStub.calledWithMatch(sinon.match.string, sinon.match.string)).toEqual(true)
      mockApi.done()
    })
  })
})
