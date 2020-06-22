import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/category/category.reducer'

test('attempt retrieving a single category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.category).toBe(null)
})

test('attempt retrieving a list of category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.categories).toEqual([])
})

test('attempt updating a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categorySuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.category).toEqual({ id: 1 })
})

test('success retrieving a list of category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.categories).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.category).toEqual({ id: 1 })
})
test('success deleting a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.category).toEqual(null)
})

test('failure retrieving a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.category).toEqual(null)
})

test('failure retrieving a list of category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.categories).toEqual([])
})

test('failure updating a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.category).toEqual(INITIAL_STATE.category)
})
test('failure deleting a category', () => {
  const state = reducer(INITIAL_STATE, Actions.categoryDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.category).toEqual(INITIAL_STATE.category)
})
