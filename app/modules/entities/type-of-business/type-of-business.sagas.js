import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TypeOfBusinessActions from './type-of-business.reducer'

export function* getTypeOfBusiness(api, action) {
  const { typeOfBusinessId } = action
  // make the call to the api
  const apiCall = call(api.getTypeOfBusiness, typeOfBusinessId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TypeOfBusinessActions.typeOfBusinessSuccess(response.data))
  } else {
    yield put(TypeOfBusinessActions.typeOfBusinessFailure(response.data))
  }
}

export function* getTypeOfBusinesses(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTypeOfBusinesses, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TypeOfBusinessActions.typeOfBusinessAllSuccess(response.data, response.headers))
  } else {
    yield put(TypeOfBusinessActions.typeOfBusinessAllFailure(response.data))
  }
}

export function* updateTypeOfBusiness(api, action) {
  const { typeOfBusiness } = action
  // make the call to the api
  const idIsNotNull = !!typeOfBusiness.id
  const apiCall = call(idIsNotNull ? api.updateTypeOfBusiness : api.createTypeOfBusiness, typeOfBusiness)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TypeOfBusinessActions.typeOfBusinessUpdateSuccess(response.data))
  } else {
    yield put(TypeOfBusinessActions.typeOfBusinessUpdateFailure(response.data))
  }
}

export function* deleteTypeOfBusiness(api, action) {
  const { typeOfBusinessId } = action
  // make the call to the api
  const apiCall = call(api.deleteTypeOfBusiness, typeOfBusinessId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TypeOfBusinessActions.typeOfBusinessDeleteSuccess())
  } else {
    yield put(TypeOfBusinessActions.typeOfBusinessDeleteFailure(response.data))
  }
}
