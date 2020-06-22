import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getOrderDetailPo,
  getOrderDetailPos,
  updateOrderDetailPo,
  deleteOrderDetailPo,
} from '../../../../../app/modules/entities/order-detail-pos/order-detail-pos.sagas'
import OrderDetailPoActions from '../../../../../app/modules/entities/order-detail-pos/order-detail-pos.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getOrderDetailPo(1)
  const step = stepper(getOrderDetailPo(FixtureAPI, { orderDetailPoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getOrderDetailPo(FixtureAPI, { orderDetailPoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getOrderDetailPos()
  const step = stepper(getOrderDetailPos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getOrderDetailPos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateOrderDetailPo({ id: 1 })
  const step = stepper(updateOrderDetailPo(FixtureAPI, { orderDetailPo: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateOrderDetailPo(FixtureAPI, { orderDetailPo: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteOrderDetailPo({ id: 1 })
  const step = stepper(deleteOrderDetailPo(FixtureAPI, { orderDetailPoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteOrderDetailPo(FixtureAPI, { orderDetailPoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(OrderDetailPoActions.orderDetailPoDeleteFailure()))
})
