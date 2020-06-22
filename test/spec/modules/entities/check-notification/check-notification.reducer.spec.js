import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/check-notification/check-notification.reducer'

test('attempt retrieving a single checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.checkNotification).toBe(null)
})

test('attempt retrieving a list of checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.checkNotifications).toEqual([])
})

test('attempt updating a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.checkNotification).toEqual({ id: 1 })
})

test('success retrieving a list of checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.checkNotifications).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.checkNotification).toEqual({ id: 1 })
})
test('success deleting a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.checkNotification).toEqual(null)
})

test('failure retrieving a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.checkNotification).toEqual(null)
})

test('failure retrieving a list of checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.checkNotifications).toEqual([])
})

test('failure updating a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.checkNotification).toEqual(INITIAL_STATE.checkNotification)
})
test('failure deleting a checkNotification', () => {
  const state = reducer(INITIAL_STATE, Actions.checkNotificationDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.checkNotification).toEqual(INITIAL_STATE.checkNotification)
})
