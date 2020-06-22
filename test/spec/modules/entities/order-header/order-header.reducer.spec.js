import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/order-header/order-header.reducer'

test('attempt retrieving a single orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.orderHeader).toBe(null)
})

test('attempt retrieving a list of orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.orderHeaders).toEqual([])
})

test('attempt updating a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.orderHeader).toEqual({ id: 1 })
})

test('success retrieving a list of orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.orderHeaders).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.orderHeader).toEqual({ id: 1 })
})
test('success deleting a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.orderHeader).toEqual(null)
})

test('failure retrieving a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.orderHeader).toEqual(null)
})

test('failure retrieving a list of orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.orderHeaders).toEqual([])
})

test('failure updating a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.orderHeader).toEqual(INITIAL_STATE.orderHeader)
})
test('failure deleting a orderHeader', () => {
  const state = reducer(INITIAL_STATE, Actions.orderHeaderDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.orderHeader).toEqual(INITIAL_STATE.orderHeader)
})
