import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  customers: require('../../modules/entities/customer/customer.reducer').reducer,
  typeOfBusinesses: require('../../modules/entities/type-of-business/type-of-business.reducer').reducer,
  products: require('../../modules/entities/product/product.reducer').reducer,
  categories: require('../../modules/entities/category/category.reducer').reducer,
  listOfPrices: require('../../modules/entities/list-of-prices/list-of-prices.reducer').reducer,
  orderHeaders: require('../../modules/entities/order-header/order-header.reducer').reducer,
  orderDetailPos: require('../../modules/entities/order-detail-pos/order-detail-pos.reducer').reducer,
  notifications: require('../../modules/entities/notification/notification.reducer').reducer,
  checkNotifications: require('../../modules/entities/check-notification/check-notification.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
