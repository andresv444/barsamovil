import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getListOfPrice,
  getListOfPrices,
  updateListOfPrice,
  deleteListOfPrice,
} from '../../../../../app/modules/entities/list-of-prices/list-of-prices.sagas'
import ListOfPriceActions from '../../../../../app/modules/entities/list-of-prices/list-of-prices.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getListOfPrice(1)
  const step = stepper(getListOfPrice(FixtureAPI, { listOfPriceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getListOfPrice(FixtureAPI, { listOfPriceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getListOfPrices()
  const step = stepper(getListOfPrices(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getListOfPrices(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateListOfPrice({ id: 1 })
  const step = stepper(updateListOfPrice(FixtureAPI, { listOfPrice: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateListOfPrice(FixtureAPI, { listOfPrice: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteListOfPrice({ id: 1 })
  const step = stepper(deleteListOfPrice(FixtureAPI, { listOfPriceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteListOfPrice(FixtureAPI, { listOfPriceId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ListOfPriceActions.listOfPriceDeleteFailure()))
})
