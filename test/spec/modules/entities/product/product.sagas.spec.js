import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getProduct, getProducts, updateProduct, deleteProduct } from '../../../../../app/modules/entities/product/product.sagas'
import ProductActions from '../../../../../app/modules/entities/product/product.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getProduct(1)
  const step = stepper(getProduct(FixtureAPI, { productId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductActions.productSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getProduct(FixtureAPI, { productId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductActions.productFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getProducts()
  const step = stepper(getProducts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductActions.productAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getProducts(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductActions.productAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateProduct({ id: 1 })
  const step = stepper(updateProduct(FixtureAPI, { product: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductActions.productUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateProduct(FixtureAPI, { product: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductActions.productUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteProduct({ id: 1 })
  const step = stepper(deleteProduct(FixtureAPI, { productId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductActions.productDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteProduct(FixtureAPI, { productId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductActions.productDeleteFailure()))
})
