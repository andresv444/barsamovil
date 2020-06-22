import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getOrderHeader,
  getOrderHeaders,
  updateOrderHeader,
  deleteOrderHeader,
} from '../../../../../app/modules/entities/order-header/order-header.sagas'
import OrderHeaderActions from '../../../../../app/modules/entities/order-header/order-header.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getOrderHeader(1)
  const step = stepper(getOrderHeader(FixtureAPI, { orderHeaderId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getOrderHeader(FixtureAPI, { orderHeaderId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getOrderHeaders()
  const step = stepper(getOrderHeaders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getOrderHeaders(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateOrderHeader({ id: 1 })
  const step = stepper(updateOrderHeader(FixtureAPI, { orderHeader: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateOrderHeader(FixtureAPI, { orderHeader: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteOrderHeader({ id: 1 })
  const step = stepper(deleteOrderHeader(FixtureAPI, { orderHeaderId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteOrderHeader(FixtureAPI, { orderHeaderId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderHeaderActions.orderHeaderDeleteFailure()))
})
