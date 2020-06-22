import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCategory, getCategories, updateCategory, deleteCategory } from '../../../../../app/modules/entities/category/category.sagas'
import CategoryActions from '../../../../../app/modules/entities/category/category.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCategory(1)
  const step = stepper(getCategory(FixtureAPI, { categoryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoryActions.categorySuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getCategory(FixtureAPI, { categoryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoryActions.categoryFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCategories()
  const step = stepper(getCategories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoryActions.categoryAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getCategories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoryActions.categoryAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCategory({ id: 1 })
  const step = stepper(updateCategory(FixtureAPI, { category: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoryActions.categoryUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateCategory(FixtureAPI, { category: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoryActions.categoryUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCategory({ id: 1 })
  const step = stepper(deleteCategory(FixtureAPI, { categoryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoryActions.categoryDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteCategory(FixtureAPI, { categoryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoryActions.categoryDeleteFailure()))
})
