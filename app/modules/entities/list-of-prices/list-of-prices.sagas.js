import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ListOfPriceActions from './list-of-prices.reducer'

export function* getListOfPrice(api, action) {
  const { listOfPriceId } = action
  // make the call to the api
  const apiCall = call(api.getListOfPrice, listOfPriceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ListOfPriceActions.listOfPriceSuccess(response.data))
  } else {
    yield put(ListOfPriceActions.listOfPriceFailure(response.data))
  }
}

export function* getListOfPrices(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getListOfPrices, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ListOfPriceActions.listOfPriceAllSuccess(response.data, response.headers))
  } else {
    yield put(ListOfPriceActions.listOfPriceAllFailure(response.data))
  }
}

export function* updateListOfPrice(api, action) {
  const { listOfPrice } = action
  // make the call to the api
  const idIsNotNull = !!listOfPrice.id
  const apiCall = call(idIsNotNull ? api.updateListOfPrice : api.createListOfPrice, listOfPrice)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ListOfPriceActions.listOfPriceUpdateSuccess(response.data))
  } else {
    yield put(ListOfPriceActions.listOfPriceUpdateFailure(response.data))
  }
}

export function* deleteListOfPrice(api, action) {
  const { listOfPriceId } = action
  // make the call to the api
  const apiCall = call(api.deleteListOfPrice, listOfPriceId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ListOfPriceActions.listOfPriceDeleteSuccess())
  } else {
    yield put(ListOfPriceActions.listOfPriceDeleteFailure(response.data))
  }
}
