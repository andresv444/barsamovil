import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/order-detail-pos/order-detail-pos.reducer'

test('attempt retrieving a single orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.orderDetailPo).toBe(null)
})

test('attempt retrieving a list of orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.orderDetailPos).toEqual([])
})

test('attempt updating a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.orderDetailPo).toEqual({ id: 1 })
})

test('success retrieving a list of orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.orderDetailPos).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.orderDetailPo).toEqual({ id: 1 })
})
test('success deleting a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.orderDetailPo).toEqual(null)
})

test('failure retrieving a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.orderDetailPo).toEqual(null)
})

test('failure retrieving a list of orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.orderDetailPos).toEqual([])
})

test('failure updating a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.orderDetailPo).toEqual(INITIAL_STATE.orderDetailPo)
})
test('failure deleting a orderDetailPo', () => {
  const state = reducer(INITIAL_STATE, Actions.orderDetailPoDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.orderDetailPo).toEqual(INITIAL_STATE.orderDetailPo)
})
