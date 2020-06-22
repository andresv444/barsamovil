import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import {
  getTypeOfBusiness,
  getTypeOfBusinesses,
  updateTypeOfBusiness,
  deleteTypeOfBusiness,
} from '../../../../../app/modules/entities/type-of-business/type-of-business.sagas'
import TypeOfBusinessActions from '../../../../../app/modules/entities/type-of-business/type-of-business.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTypeOfBusiness(1)
  const step = stepper(getTypeOfBusiness(FixtureAPI, { typeOfBusinessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getTypeOfBusiness(FixtureAPI, { typeOfBusinessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTypeOfBusinesses()
  const step = stepper(getTypeOfBusinesses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getTypeOfBusinesses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTypeOfBusiness({ id: 1 })
  const step = stepper(updateTypeOfBusiness(FixtureAPI, { typeOfBusiness: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateTypeOfBusiness(FixtureAPI, { typeOfBusiness: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteTypeOfBusiness({ id: 1 })
  const step = stepper(deleteTypeOfBusiness(FixtureAPI, { typeOfBusinessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteTypeOfBusiness(FixtureAPI, { typeOfBusinessId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TypeOfBusinessActions.typeOfBusinessDeleteFailure()))
})
