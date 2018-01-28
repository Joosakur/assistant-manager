import { clone } from 'ramda'

import { testState } from './testData'
import rootReducer from './index'
import {createAssistantSuccess, listAssistantsSuccess, updateAssistantSuccess} from "../actions/api/assistantActions"
import {selAssistantById, selAssistantsArray} from "../selectors/entities/assistants"
import {selWorkShiftIdsByAssistant, selWorkShiftsByAssistantIndex} from "../selectors/entities/indexes"
import {createWorkShiftSuccess, listWorkShiftsSuccess, updateWorkShiftSuccess} from "../actions/api/workShiftActions"
import {selWorkShiftById, selWorkShiftsArray} from "../selectors/entities/workShifts"

describe('entities reducer', () => {
  let beforeState

  beforeEach(() => {
    beforeState = clone(testState)
  })

  afterEach(() => {
    expect(beforeState).toEqual(testState)
  })

  describe('assistants', () => {
    const assistant2 = { // has changed a little
      id: 'a002',
      email: 'andy2@gmail.com',
      firstName: 'Andy',
      lastName: 'Ant-Eater',
      backgroundColor: '#688684',
      textColor: '#000000',
      exportedUntil: '2017-12-29'
    }

    const assistant3 = { // fully new assistant
      id: 'a003',
      email: 'new@gmail.com',
      firstName: 'Donald',
      lastName: 'Duck',
      nickName: 'Donald',
      backgroundColor: '#1234ab',
      textColor: '#ffffff',
    }

    describe('createAssistantSuccess', () => {
      const action = createAssistantSuccess(assistant3)

      it('adds the assistant to the assistant map with id as key', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selAssistantsArray(afterState)).toHaveLength(3)
        expect(selAssistantById('a003')(afterState)).toEqual(assistant3)
      })

      it('creates an empty entry to the work shifts by assistant index', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftIdsByAssistant('a001')(afterState)).toEqual(['ws001', 'ws002'])
        expect(selWorkShiftIdsByAssistant('a003')(afterState)).toEqual([])
      })
    })

    describe('listAssistantsSuccess', () => {
      const action = listAssistantsSuccess([assistant2, assistant3])

      it('replaces the assistants map with a new one and adds the assistants to it', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selAssistantsArray(afterState)).toHaveLength(2)
        expect(selAssistantById('a002')(afterState)).toEqual(assistant2)
        expect(selAssistantById('a003')(afterState)).toEqual(assistant3)
      })

      it('adds empty entries to work shifts by assistant index for those still missing and removes orphan entries', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftIdsByAssistant('a001')(afterState)).toBeUndefined() // this assistant has been removed
        expect(selWorkShiftIdsByAssistant('a002')(afterState)).toEqual(['ws003', 'ws004']) // this entry should stay
        expect(selWorkShiftIdsByAssistant('a003')(afterState)).toEqual([]) // new entry for new assistannt
      })
    })

    describe('updateAssistantSuccess', () => {
      const updatedAssistant = {
        id: 'a001',
        email: 'help@yahoo.com',
        firstName: 'Helpy',
        lastName: 'Helbie',
        backgroundColor: '#55aa84',
        textColor: '#000000',
        exportedUntil: '2017-12-29'
      }
      const action = updateAssistantSuccess(updatedAssistant)

      it('replaces the assistant from assistant map', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selAssistantsArray(afterState)).toHaveLength(2)
        expect(selAssistantById('a001')(afterState)).toEqual(updatedAssistant)
        expect(selWorkShiftIdsByAssistant('a001')(afterState)).toEqual(['ws001', 'ws002'])
      })

      it('does not change the work shifts by assistant index', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftIdsByAssistant('a001')(afterState)).toEqual(['ws001', 'ws002'])
      })
    })
  })

  describe('workShifts', () => {
    const workShift1 = { // existing work shift updated, time changed
      id: 'ws001',
      assistantId: 'a001',
      start: '2017-12-01T09:15:00',
      end: '2017-12-01T16:45:00',
      sick: false
    }

    const workShift2 = { // existing work shift updated, assistant changed
      id: 'ws002',
      assistantId: 'a002',
      start: '2017-12-02T17:00:00',
      end: '2017-12-02T23:00:00',
      sick: true
    }

    const workShift3 = { // existing work shift updated, assistant removed
      id: 'ws003',
      start: '2017-12-01T23:00:00',
      end: '2017-12-02T09:00:00',
      sick: false
    }

    const workShift5 = { // new work shift, assistant is in state
      id: 'ws005',
      assistantId: 'a001',
      start: '2017-12-04T09:00:00',
      end: '2017-12-04T17:00:00',
      sick: false
    }

    const workShift6 = { // new work shift, assistant is not yet in state
      id: 'ws006',
      assistantId: 'a003',
      start: '2017-12-05T09:00:00',
      end: '2017-12-05T17:00:00',
      sick: false
    }

    const workShift7 = { // new work shift without assistant
      id: 'ws007',
      start: '2017-12-05T09:00:00',
      end: '2017-12-05T17:00:00',
      sick: false
    }

    describe('createWorkShiftSuccess', () => {
      it('adds the workShift to workShift map with id as key', () => {
        const action = createWorkShiftSuccess(workShift5)
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftsArray(afterState)).toHaveLength(5)
        expect(selWorkShiftById('ws005')(afterState)).toEqual(workShift5)
      })

      it('updates index by assistant', () => {
        const action = createWorkShiftSuccess(workShift5)
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftIdsByAssistant('a001')(afterState)).toEqual(['ws001', 'ws002', 'ws005'])
      })

      it('creates index by assistant entry if it does not yet exist', () => {
        const action = createWorkShiftSuccess(workShift6)
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftIdsByAssistant('a003')(afterState)).toEqual(['ws006'])
      })
    })

    describe('listWorkShiftsSuccess', () => {
      const action = listWorkShiftsSuccess([workShift1, workShift2, workShift3, workShift5, workShift6, workShift7])

      it('replaces work shifts map with a new one and populates it', () => {
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftsArray(afterState)).toHaveLength(6)
        expect(selWorkShiftById('ws001')(afterState)).toEqual(workShift1)
        expect(selWorkShiftById('ws002')(afterState)).toEqual(workShift2)
        expect(selWorkShiftById('ws003')(afterState)).toEqual(workShift3)
        expect(selWorkShiftById('ws004')(afterState)).toBeUndefined()
        expect(selWorkShiftById('ws005')(afterState)).toEqual(workShift5)
        expect(selWorkShiftById('ws006')(afterState)).toEqual(workShift6)
        expect(selWorkShiftById('ws007')(afterState)).toEqual(workShift7)
      })

      it('updates the work shifts by assistant index', () => {
        const afterState = rootReducer(beforeState, action)
        expect(Object.keys(selWorkShiftsByAssistantIndex(afterState))).toHaveLength(3)

        const workShiftsOfAssistant1 = selWorkShiftIdsByAssistant('a001')(afterState)
        expect(workShiftsOfAssistant1).toHaveLength(2)
        expect(workShiftsOfAssistant1).toContain('ws001')
        expect(workShiftsOfAssistant1).toContain('ws005')

        const workShiftsOfAssistant2 = selWorkShiftIdsByAssistant('a002')(afterState)
        expect(workShiftsOfAssistant2).toEqual(['ws002'])

        const workShiftsOfAssistant3 = selWorkShiftIdsByAssistant('a003')(afterState)
        expect(workShiftsOfAssistant3).toEqual(['ws006'])
      })
    })

    describe('updateWorkShiftSuccess', () => {

      it('updates the work shift in the map', () => {
        const action = updateWorkShiftSuccess(workShift1)
        const afterState = rootReducer(beforeState, action)
        expect(selWorkShiftsArray(afterState)).toHaveLength(4)
        expect(selWorkShiftById('ws001')(afterState)).toEqual(workShift1)
      })

      it('updates the work shifts by assistant index if assistant changes', () => {
        const action = updateWorkShiftSuccess(workShift2)
        const afterState = rootReducer(beforeState, action)

        const workShiftsOfAssistant1 = selWorkShiftIdsByAssistant('a001')(afterState)
        expect(workShiftsOfAssistant1).toEqual(['ws001'])

        const workShiftsOfAssistant2 = selWorkShiftIdsByAssistant('a002')(afterState)
        expect(workShiftsOfAssistant2).toHaveLength(3)
        expect(workShiftsOfAssistant2).toContain('ws002')
        expect(workShiftsOfAssistant2).toContain('ws003')
        expect(workShiftsOfAssistant2).toContain('ws004')
      })


    })



  })

})
