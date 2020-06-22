import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CustomerActions from './customer.reducer'

export function* getCustomer(api, action) {
  const { customerId } = action
  // make the call to the api
  const apiCall = call(api.getCustomer, customerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CustomerActions.customerSuccess(response.data))
  } else {
    yield put(CustomerActions.customerFailure(response.data))
  }
}

export function* getCustomers(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCustomers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CustomerActions.customerAllSuccess(response.data, response.headers))
  } else {
    yield put(CustomerActions.customerAllFailure(response.data))
  }
}

export function* updateCustomer(api, action) {
  const { customer } = action
  // make the call to the api
  const idIsNotNull = !!customer.id
  const apiCall = call(idIsNotNull ? api.updateCustomer : api.createCustomer, customer)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CustomerActions.customerUpdateSuccess(response.data))
  } else {
    yield put(CustomerActions.customerUpdateFailure(response.data))
  }
}

export function* deleteCustomer(api, action) {
  const { customerId } = action
  // make the call to the api
  const apiCall = call(api.deleteCustomer, customerId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CustomerActions.customerDeleteSuccess())
  } else {
    yield put(CustomerActions.customerDeleteFailure(response.data))
  }
}
