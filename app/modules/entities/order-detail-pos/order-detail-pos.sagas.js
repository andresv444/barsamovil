import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderDetailPoActions from './order-detail-pos.reducer'

export function* getOrderDetailPo(api, action) {
  const { orderDetailPoId } = action
  // make the call to the api
  const apiCall = call(api.getOrderDetailPo, orderDetailPoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailPoActions.orderDetailPoSuccess(response.data))
  } else {
    yield put(OrderDetailPoActions.orderDetailPoFailure(response.data))
  }
}

export function* getOrderDetailPos(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderDetailPos, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailPoActions.orderDetailPoAllSuccess(response.data, response.headers))
  } else {
    yield put(OrderDetailPoActions.orderDetailPoAllFailure(response.data))
  }
}

export function* updateOrderDetailPo(api, action) {
  const { orderDetailPo } = action
  // make the call to the api
  const idIsNotNull = !!orderDetailPo.id
  const apiCall = call(idIsNotNull ? api.updateOrderDetailPo : api.createOrderDetailPo, orderDetailPo)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailPoActions.orderDetailPoUpdateSuccess(response.data))
  } else {
    yield put(OrderDetailPoActions.orderDetailPoUpdateFailure(response.data))
  }
}

export function* deleteOrderDetailPo(api, action) {
  const { orderDetailPoId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderDetailPo, orderDetailPoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailPoActions.orderDetailPoDeleteSuccess())
  } else {
    yield put(OrderDetailPoActions.orderDetailPoDeleteFailure(response.data))
  }
}
