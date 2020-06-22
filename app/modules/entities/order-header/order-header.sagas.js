import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderHeaderActions from './order-header.reducer'

export function* getOrderHeader(api, action) {
  const { orderHeaderId } = action
  // make the call to the api
  const apiCall = call(api.getOrderHeader, orderHeaderId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderHeaderActions.orderHeaderSuccess(response.data))
  } else {
    yield put(OrderHeaderActions.orderHeaderFailure(response.data))
  }
}

export function* getOrderHeaders(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderHeaders, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderHeaderActions.orderHeaderAllSuccess(response.data, response.headers))
  } else {
    yield put(OrderHeaderActions.orderHeaderAllFailure(response.data))
  }
}

export function* updateOrderHeader(api, action) {
  const { orderHeader } = action
  // make the call to the api
  const idIsNotNull = !!orderHeader.id
  const apiCall = call(idIsNotNull ? api.updateOrderHeader : api.createOrderHeader, orderHeader)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderHeaderActions.orderHeaderUpdateSuccess(response.data))
  } else {
    yield put(OrderHeaderActions.orderHeaderUpdateFailure(response.data))
  }
}

export function* deleteOrderHeader(api, action) {
  const { orderHeaderId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderHeader, orderHeaderId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderHeaderActions.orderHeaderDeleteSuccess())
  } else {
    yield put(OrderHeaderActions.orderHeaderDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.dateCreation) {
    data.dateCreation = new Date(data.dateCreation)
  }
  if (data.dateLastChange) {
    data.dateLastChange = new Date(data.dateLastChange)
  }
  if (data.dateDelivery) {
    data.dateDelivery = new Date(data.dateDelivery)
  }
  return data
}
