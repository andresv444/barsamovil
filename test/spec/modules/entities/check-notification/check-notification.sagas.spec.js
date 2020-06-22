import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getCheckNotification,
  getCheckNotifications,
  updateCheckNotification,
  deleteCheckNotification,
} from '../../../../../app/modules/entities/check-notification/check-notification.sagas'
import CheckNotificationActions from '../../../../../app/modules/entities/check-notification/check-notification.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCheckNotification(1)
  const step = stepper(getCheckNotification(FixtureAPI, { checkNotificationId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getCheckNotification(FixtureAPI, { checkNotificationId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCheckNotifications()
  const step = stepper(getCheckNotifications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getCheckNotifications(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCheckNotification({ id: 1 })
  const step = stepper(updateCheckNotification(FixtureAPI, { checkNotification: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateCheckNotification(FixtureAPI, { checkNotification: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCheckNotification({ id: 1 })
  const step = stepper(deleteCheckNotification(FixtureAPI, { checkNotificationId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteCheckNotification(FixtureAPI, { checkNotificationId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CheckNotificationActions.checkNotificationDeleteFailure()))
})
