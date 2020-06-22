import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { CustomerTypes } from '../../modules/entities/customer/customer.reducer'
import { TypeOfBusinessTypes } from '../../modules/entities/type-of-business/type-of-business.reducer'
import { ProductTypes } from '../../modules/entities/product/product.reducer'
import { CategoryTypes } from '../../modules/entities/category/category.reducer'
import { ListOfPriceTypes } from '../../modules/entities/list-of-prices/list-of-prices.reducer'
import { OrderHeaderTypes } from '../../modules/entities/order-header/order-header.reducer'
import { OrderDetailPoTypes } from '../../modules/entities/order-detail-pos/order-detail-pos.reducer'
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer'
import { CheckNotificationTypes } from '../../modules/entities/check-notification/check-notification.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getCustomer, getCustomers, updateCustomer, deleteCustomer } from '../../modules/entities/customer/customer.sagas'
import {
  getTypeOfBusiness,
  getTypeOfBusinesses,
  updateTypeOfBusiness,
  deleteTypeOfBusiness,
} from '../../modules/entities/type-of-business/type-of-business.sagas'
import { getProduct, getProducts, updateProduct, deleteProduct } from '../../modules/entities/product/product.sagas'
import { getCategory, getCategories, updateCategory, deleteCategory } from '../../modules/entities/category/category.sagas'
import {
  getListOfPrice,
  getListOfPrices,
  updateListOfPrice,
  deleteListOfPrice,
} from '../../modules/entities/list-of-prices/list-of-prices.sagas'
import {
  getOrderHeader,
  getOrderHeaders,
  updateOrderHeader,
  deleteOrderHeader,
} from '../../modules/entities/order-header/order-header.sagas'
import {
  getOrderDetailPo,
  getOrderDetailPos,
  updateOrderDetailPo,
  deleteOrderDetailPo,
} from '../../modules/entities/order-detail-pos/order-detail-pos.sagas'
import {
  getNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
} from '../../modules/entities/notification/notification.sagas'
import {
  getCheckNotification,
  getCheckNotifications,
  updateCheckNotification,
  deleteCheckNotification,
} from '../../modules/entities/check-notification/check-notification.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(CustomerTypes.CUSTOMER_REQUEST, getCustomer, api),
    takeLatest(CustomerTypes.CUSTOMER_ALL_REQUEST, getCustomers, api),
    takeLatest(CustomerTypes.CUSTOMER_UPDATE_REQUEST, updateCustomer, api),
    takeLatest(CustomerTypes.CUSTOMER_DELETE_REQUEST, deleteCustomer, api),

    takeLatest(TypeOfBusinessTypes.TYPE_OF_BUSINESS_REQUEST, getTypeOfBusiness, api),
    takeLatest(TypeOfBusinessTypes.TYPE_OF_BUSINESS_ALL_REQUEST, getTypeOfBusinesses, api),
    takeLatest(TypeOfBusinessTypes.TYPE_OF_BUSINESS_UPDATE_REQUEST, updateTypeOfBusiness, api),
    takeLatest(TypeOfBusinessTypes.TYPE_OF_BUSINESS_DELETE_REQUEST, deleteTypeOfBusiness, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, getProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, deleteProduct, api),

    takeLatest(CategoryTypes.CATEGORY_REQUEST, getCategory, api),
    takeLatest(CategoryTypes.CATEGORY_ALL_REQUEST, getCategories, api),
    takeLatest(CategoryTypes.CATEGORY_UPDATE_REQUEST, updateCategory, api),
    takeLatest(CategoryTypes.CATEGORY_DELETE_REQUEST, deleteCategory, api),

    takeLatest(ListOfPriceTypes.LIST_OF_PRICE_REQUEST, getListOfPrice, api),
    takeLatest(ListOfPriceTypes.LIST_OF_PRICE_ALL_REQUEST, getListOfPrices, api),
    takeLatest(ListOfPriceTypes.LIST_OF_PRICE_UPDATE_REQUEST, updateListOfPrice, api),
    takeLatest(ListOfPriceTypes.LIST_OF_PRICE_DELETE_REQUEST, deleteListOfPrice, api),

    takeLatest(OrderHeaderTypes.ORDER_HEADER_REQUEST, getOrderHeader, api),
    takeLatest(OrderHeaderTypes.ORDER_HEADER_ALL_REQUEST, getOrderHeaders, api),
    takeLatest(OrderHeaderTypes.ORDER_HEADER_UPDATE_REQUEST, updateOrderHeader, api),
    takeLatest(OrderHeaderTypes.ORDER_HEADER_DELETE_REQUEST, deleteOrderHeader, api),

    takeLatest(OrderDetailPoTypes.ORDER_DETAIL_PO_REQUEST, getOrderDetailPo, api),
    takeLatest(OrderDetailPoTypes.ORDER_DETAIL_PO_ALL_REQUEST, getOrderDetailPos, api),
    takeLatest(OrderDetailPoTypes.ORDER_DETAIL_PO_UPDATE_REQUEST, updateOrderDetailPo, api),
    takeLatest(OrderDetailPoTypes.ORDER_DETAIL_PO_DELETE_REQUEST, deleteOrderDetailPo, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, getNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, deleteNotification, api),

    takeLatest(CheckNotificationTypes.CHECK_NOTIFICATION_REQUEST, getCheckNotification, api),
    takeLatest(CheckNotificationTypes.CHECK_NOTIFICATION_ALL_REQUEST, getCheckNotifications, api),
    takeLatest(CheckNotificationTypes.CHECK_NOTIFICATION_UPDATE_REQUEST, updateCheckNotification, api),
    takeLatest(CheckNotificationTypes.CHECK_NOTIFICATION_DELETE_REQUEST, deleteCheckNotification, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ])
}
