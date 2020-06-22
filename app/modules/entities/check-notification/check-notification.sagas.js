import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CheckNotificationActions from './check-notification.reducer'

export function* getCheckNotification(api, action) {
  const { checkNotificationId } = action
  // make the call to the api
  const apiCall = call(api.getCheckNotification, checkNotificationId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CheckNotificationActions.checkNotificationSuccess(response.data))
  } else {
    yield put(CheckNotificationActions.checkNotificationFailure(response.data))
  }
}

export function* getCheckNotifications(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCheckNotifications, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CheckNotificationActions.checkNotificationAllSuccess(response.data, response.headers))
  } else {
    yield put(CheckNotificationActions.checkNotificationAllFailure(response.data))
  }
}

export function* updateCheckNotification(api, action) {
  const { checkNotification } = action
  // make the call to the api
  const idIsNotNull = !!checkNotification.id
  const apiCall = call(idIsNotNull ? api.updateCheckNotification : api.createCheckNotification, checkNotification)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CheckNotificationActions.checkNotificationUpdateSuccess(response.data))
  } else {
    yield put(CheckNotificationActions.checkNotificationUpdateFailure(response.data))
  }
}

export function* deleteCheckNotification(api, action) {
  const { checkNotificationId } = action
  // make the call to the api
  const apiCall = call(api.deleteCheckNotification, checkNotificationId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CheckNotificationActions.checkNotificationDeleteSuccess())
  } else {
    yield put(CheckNotificationActions.checkNotificationDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.date) {
    data.date = new Date(data.date)
  }
  return data
}
