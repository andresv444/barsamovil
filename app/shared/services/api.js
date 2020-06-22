// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    )

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getCustomer = (customerId) => api.get('api/customers/' + customerId)
  const getCustomers = (options) => api.get('api/customers', options)
  const createCustomer = (customer) => api.post('api/customers', customer)
  const updateCustomer = (customer) => api.put('api/customers', customer)
  const deleteCustomer = (customerId) => api.delete('api/customers/' + customerId)

  const getTypeOfBusiness = (typeOfBusinessId) => api.get('api/type-of-businesses/' + typeOfBusinessId)
  const getTypeOfBusinesses = (options) => api.get('api/type-of-businesses', options)
  const createTypeOfBusiness = (typeOfBusiness) => api.post('api/type-of-businesses', typeOfBusiness)
  const updateTypeOfBusiness = (typeOfBusiness) => api.put('api/type-of-businesses', typeOfBusiness)
  const deleteTypeOfBusiness = (typeOfBusinessId) => api.delete('api/type-of-businesses/' + typeOfBusinessId)

  const getProduct = (productId) => api.get('api/products/' + productId)
  const getProducts = (options) => api.get('api/products', options)
  const createProduct = (product) => api.post('api/products', product)
  const updateProduct = (product) => api.put('api/products', product)
  const deleteProduct = (productId) => api.delete('api/products/' + productId)

  const getCategory = (categoryId) => api.get('api/categories/' + categoryId)
  const getCategories = (options) => api.get('api/categories', options)
  const createCategory = (category) => api.post('api/categories', category)
  const updateCategory = (category) => api.put('api/categories', category)
  const deleteCategory = (categoryId) => api.delete('api/categories/' + categoryId)

  const getListOfPrice = (listOfPriceId) => api.get('api/list-of-prices/' + listOfPriceId)
  const getListOfPrices = (options) => api.get('api/list-of-prices', options)
  const createListOfPrice = (listOfPrice) => api.post('api/list-of-prices', listOfPrice)
  const updateListOfPrice = (listOfPrice) => api.put('api/list-of-prices', listOfPrice)
  const deleteListOfPrice = (listOfPriceId) => api.delete('api/list-of-prices/' + listOfPriceId)

  const getOrderHeader = (orderHeaderId) => api.get('api/order-headers/' + orderHeaderId)
  const getOrderHeaders = (options) => api.get('api/order-headers', options)
  const createOrderHeader = (orderHeader) => api.post('api/order-headers', orderHeader)
  const updateOrderHeader = (orderHeader) => api.put('api/order-headers', orderHeader)
  const deleteOrderHeader = (orderHeaderId) => api.delete('api/order-headers/' + orderHeaderId)

  const getOrderDetailPo = (orderDetailPoId) => api.get('api/order-detail-pos/' + orderDetailPoId)
  const getOrderDetailPos = (options) => api.get('api/order-detail-pos', options)
  const createOrderDetailPo = (orderDetailPo) => api.post('api/order-detail-pos', orderDetailPo)
  const updateOrderDetailPo = (orderDetailPo) => api.put('api/order-detail-pos', orderDetailPo)
  const deleteOrderDetailPo = (orderDetailPoId) => api.delete('api/order-detail-pos/' + orderDetailPoId)

  const getNotification = (notificationId) => api.get('api/notifications/' + notificationId)
  const getNotifications = (options) => api.get('api/notifications', options)
  const createNotification = (notification) => api.post('api/notifications', notification)
  const updateNotification = (notification) => api.put('api/notifications', notification)
  const deleteNotification = (notificationId) => api.delete('api/notifications/' + notificationId)

  const getCheckNotification = (checkNotificationId) => api.get('api/check-notifications/' + checkNotificationId)
  const getCheckNotifications = (options) => api.get('api/check-notifications', options)
  const createCheckNotification = (checkNotification) => api.post('api/check-notifications', checkNotification)
  const updateCheckNotification = (checkNotification) => api.put('api/check-notifications', checkNotification)
  const deleteCheckNotification = (checkNotificationId) => api.delete('api/check-notifications/' + checkNotificationId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createCustomer,
    updateCustomer,
    getCustomers,
    getCustomer,
    deleteCustomer,

    createTypeOfBusiness,
    updateTypeOfBusiness,
    getTypeOfBusinesses,
    getTypeOfBusiness,
    deleteTypeOfBusiness,

    createProduct,
    updateProduct,
    getProducts,
    getProduct,
    deleteProduct,

    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory,

    createListOfPrice,
    updateListOfPrice,
    getListOfPrices,
    getListOfPrice,
    deleteListOfPrice,

    createOrderHeader,
    updateOrderHeader,
    getOrderHeaders,
    getOrderHeader,
    deleteOrderHeader,

    createOrderDetailPo,
    updateOrderDetailPo,
    getOrderDetailPos,
    getOrderDetailPo,
    deleteOrderDetailPo,

    createNotification,
    updateNotification,
    getNotifications,
    getNotification,
    deleteNotification,

    createCheckNotification,
    updateCheckNotification,
    getCheckNotifications,
    getCheckNotification,
    deleteCheckNotification,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
