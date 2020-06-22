export default {
  // Functions return fixtures

  // entity fixtures
  updateCustomer: (customer) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-customer.json'),
    }
  },
  getCustomers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-customers.json'),
    }
  },
  getCustomer: (customerId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-customer.json'),
    }
  },
  deleteCustomer: (customerId) => {
    return {
      ok: true,
    }
  },
  updateTypeOfBusiness: (typeOfBusiness) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-typeofbusiness.json'),
    }
  },
  getTypeOfBusinesses: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-typeofbusinesses.json'),
    }
  },
  getTypeOfBusiness: (typeOfBusinessId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-typeofbusiness.json'),
    }
  },
  deleteTypeOfBusiness: (typeOfBusinessId) => {
    return {
      ok: true,
    }
  },
  updateProduct: (product) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product.json'),
    }
  },
  getProducts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-products.json'),
    }
  },
  getProduct: (productId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product.json'),
    }
  },
  deleteProduct: (productId) => {
    return {
      ok: true,
    }
  },
  updateCategory: (category) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-category.json'),
    }
  },
  getCategories: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-categories.json'),
    }
  },
  getCategory: (categoryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-category.json'),
    }
  },
  deleteCategory: (categoryId) => {
    return {
      ok: true,
    }
  },
  updateListOfPrice: (listOfPrice) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-listofprice.json'),
    }
  },
  getListOfPrices: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-listofprices.json'),
    }
  },
  getListOfPrice: (listOfPriceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-listofprice.json'),
    }
  },
  deleteListOfPrice: (listOfPriceId) => {
    return {
      ok: true,
    }
  },
  updateOrderHeader: (orderHeader) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-orderheader.json'),
    }
  },
  getOrderHeaders: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-orderheaders.json'),
    }
  },
  getOrderHeader: (orderHeaderId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-orderheader.json'),
    }
  },
  deleteOrderHeader: (orderHeaderId) => {
    return {
      ok: true,
    }
  },
  updateOrderDetailPo: (orderDetailPo) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-orderdetailpo.json'),
    }
  },
  getOrderDetailPos: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-orderdetailpos.json'),
    }
  },
  getOrderDetailPo: (orderDetailPoId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-orderdetailpo.json'),
    }
  },
  deleteOrderDetailPo: (orderDetailPoId) => {
    return {
      ok: true,
    }
  },
  updateNotification: (notification) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-notification.json'),
    }
  },
  getNotifications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-notifications.json'),
    }
  },
  getNotification: (notificationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-notification.json'),
    }
  },
  deleteNotification: (notificationId) => {
    return {
      ok: true,
    }
  },
  updateCheckNotification: (checkNotification) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-checknotification.json'),
    }
  },
  getCheckNotifications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-checknotifications.json'),
    }
  },
  getCheckNotification: (checkNotificationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-checknotification.json'),
    }
  },
  deleteCheckNotification: (checkNotificationId) => {
    return {
      ok: true,
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    }
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    }
  },
  updateAccount: () => {
    return {
      ok: true,
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      }
    } else {
      return {
        ok: false,
        data: 'Password error',
      }
    }
  },
}
