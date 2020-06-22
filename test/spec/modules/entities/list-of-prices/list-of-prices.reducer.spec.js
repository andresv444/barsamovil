import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/list-of-prices/list-of-prices.reducer'

test('attempt retrieving a single listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.listOfPrice).toBe(null)
})

test('attempt retrieving a list of listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.listOfPrices).toEqual([])
})

test('attempt updating a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.listOfPrice).toEqual({ id: 1 })
})

test('success retrieving a list of listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.listOfPrices).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.listOfPrice).toEqual({ id: 1 })
})
test('success deleting a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.listOfPrice).toEqual(null)
})

test('failure retrieving a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.listOfPrice).toEqual(null)
})

test('failure retrieving a list of listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.listOfPrices).toEqual([])
})

test('failure updating a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.listOfPrice).toEqual(INITIAL_STATE.listOfPrice)
})
test('failure deleting a listOfPrice', () => {
  const state = reducer(INITIAL_STATE, Actions.listOfPriceDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.listOfPrice).toEqual(INITIAL_STATE.listOfPrice)
})
