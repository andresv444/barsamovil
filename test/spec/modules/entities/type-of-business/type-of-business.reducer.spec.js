import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/type-of-business/type-of-business.reducer'

test('attempt retrieving a single typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.typeOfBusiness).toBe(null)
})

test('attempt retrieving a list of typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.typeOfBusinesses).toEqual([])
})

test('attempt updating a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.typeOfBusiness).toEqual({ id: 1 })
})

test('success retrieving a list of typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.typeOfBusinesses).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.typeOfBusiness).toEqual({ id: 1 })
})
test('success deleting a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.typeOfBusiness).toEqual(null)
})

test('failure retrieving a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.typeOfBusiness).toEqual(null)
})

test('failure retrieving a list of typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.typeOfBusinesses).toEqual([])
})

test('failure updating a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.typeOfBusiness).toEqual(INITIAL_STATE.typeOfBusiness)
})
test('failure deleting a typeOfBusiness', () => {
  const state = reducer(INITIAL_STATE, Actions.typeOfBusinessDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.typeOfBusiness).toEqual(INITIAL_STATE.typeOfBusiness)
})
