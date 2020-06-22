import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import StorybookScreen from '../../storybook'
import CustomerEntityScreen from '../modules/entities/customer/customer-entity-screen'
import CustomerEntityDetailScreen from '../modules/entities/customer/customer-entity-detail-screen'
import CustomerEntityEditScreen from '../modules/entities/customer/customer-entity-edit-screen'
import TypeOfBusinessEntityScreen from '../modules/entities/type-of-business/type-of-business-entity-screen'
import TypeOfBusinessEntityDetailScreen from '../modules/entities/type-of-business/type-of-business-entity-detail-screen'
import TypeOfBusinessEntityEditScreen from '../modules/entities/type-of-business/type-of-business-entity-edit-screen'
import ProductEntityScreen from '../modules/entities/product/product-entity-screen'
import ProductEntityDetailScreen from '../modules/entities/product/product-entity-detail-screen'
import ProductEntityEditScreen from '../modules/entities/product/product-entity-edit-screen'
import CategoryEntityScreen from '../modules/entities/category/category-entity-screen'
import CategoryEntityDetailScreen from '../modules/entities/category/category-entity-detail-screen'
import CategoryEntityEditScreen from '../modules/entities/category/category-entity-edit-screen'
import ListOfPriceEntityScreen from '../modules/entities/list-of-prices/list-of-prices-entity-screen'
import ListOfPriceEntityDetailScreen from '../modules/entities/list-of-prices/list-of-prices-entity-detail-screen'
import ListOfPriceEntityEditScreen from '../modules/entities/list-of-prices/list-of-prices-entity-edit-screen'
import OrderHeaderEntityScreen from '../modules/entities/order-header/order-header-entity-screen'
import OrderHeaderEntityDetailScreen from '../modules/entities/order-header/order-header-entity-detail-screen'
import OrderHeaderEntityEditScreen from '../modules/entities/order-header/order-header-entity-edit-screen'
import OrderDetailPoEntityScreen from '../modules/entities/order-detail-pos/order-detail-pos-entity-screen'
import OrderDetailPoEntityDetailScreen from '../modules/entities/order-detail-pos/order-detail-pos-entity-detail-screen'
import OrderDetailPoEntityEditScreen from '../modules/entities/order-detail-pos/order-detail-pos-entity-edit-screen'
import NotificationEntityScreen from '../modules/entities/notification/notification-entity-screen'
import NotificationEntityDetailScreen from '../modules/entities/notification/notification-entity-detail-screen'
import NotificationEntityEditScreen from '../modules/entities/notification/notification-entity-edit-screen'
import CheckNotificationEntityScreen from '../modules/entities/check-notification/check-notification-entity-screen'
import CheckNotificationEntityDetailScreen from '../modules/entities/check-notification/check-notification-entity-detail-screen'
import CheckNotificationEntityEditScreen from '../modules/entities/check-notification/check-notification-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const STORYBOOK_SCREEN = 'nav.StorybookScreen'
export const CUSTOMER_ENTITY_SCREEN = 'nav.CustomerEntityScreen'
export const CUSTOMER_ENTITY_DETAIL_SCREEN = 'nav.CustomerEntityDetailScreen'
export const CUSTOMER_ENTITY_EDIT_SCREEN = 'nav.CustomerEntityEditScreen'
export const TYPE_OF_BUSINESS_ENTITY_SCREEN = 'nav.TypeOfBusinessEntityScreen'
export const TYPE_OF_BUSINESS_ENTITY_DETAIL_SCREEN = 'nav.TypeOfBusinessEntityDetailScreen'
export const TYPE_OF_BUSINESS_ENTITY_EDIT_SCREEN = 'nav.TypeOfBusinessEntityEditScreen'
export const PRODUCT_ENTITY_SCREEN = 'nav.ProductEntityScreen'
export const PRODUCT_ENTITY_DETAIL_SCREEN = 'nav.ProductEntityDetailScreen'
export const PRODUCT_ENTITY_EDIT_SCREEN = 'nav.ProductEntityEditScreen'
export const CATEGORY_ENTITY_SCREEN = 'nav.CategoryEntityScreen'
export const CATEGORY_ENTITY_DETAIL_SCREEN = 'nav.CategoryEntityDetailScreen'
export const CATEGORY_ENTITY_EDIT_SCREEN = 'nav.CategoryEntityEditScreen'
export const LIST_OF_PRICE_ENTITY_SCREEN = 'nav.ListOfPriceEntityScreen'
export const LIST_OF_PRICE_ENTITY_DETAIL_SCREEN = 'nav.ListOfPriceEntityDetailScreen'
export const LIST_OF_PRICE_ENTITY_EDIT_SCREEN = 'nav.ListOfPriceEntityEditScreen'
export const ORDER_HEADER_ENTITY_SCREEN = 'nav.OrderHeaderEntityScreen'
export const ORDER_HEADER_ENTITY_DETAIL_SCREEN = 'nav.OrderHeaderEntityDetailScreen'
export const ORDER_HEADER_ENTITY_EDIT_SCREEN = 'nav.OrderHeaderEntityEditScreen'
export const ORDER_DETAIL_PO_ENTITY_SCREEN = 'nav.OrderDetailPoEntityScreen'
export const ORDER_DETAIL_PO_ENTITY_DETAIL_SCREEN = 'nav.OrderDetailPoEntityDetailScreen'
export const ORDER_DETAIL_PO_ENTITY_EDIT_SCREEN = 'nav.OrderDetailPoEntityEditScreen'
export const NOTIFICATION_ENTITY_SCREEN = 'nav.NotificationEntityScreen'
export const NOTIFICATION_ENTITY_DETAIL_SCREEN = 'nav.NotificationEntityDetailScreen'
export const NOTIFICATION_ENTITY_EDIT_SCREEN = 'nav.NotificationEntityEditScreen'
export const CHECK_NOTIFICATION_ENTITY_SCREEN = 'nav.CheckNotificationEntityScreen'
export const CHECK_NOTIFICATION_ENTITY_DETAIL_SCREEN = 'nav.CheckNotificationEntityDetailScreen'
export const CHECK_NOTIFICATION_ENTITY_EDIT_SCREEN = 'nav.CheckNotificationEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT,
        },
      },
      center: {
        stack: {
          id: 'center',
          children: [
            {
              component: {
                name: LAUNCH_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'Welcome!',
                      color: Colors.snow,
                    },
                    leftButtons: [
                      {
                        id: 'menuButton',
                        icon: Images.menuIcon,
                        testID: 'menuButton',
                        color: Colors.snow,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
}

let lastAppState = 'active'
function handleAppStateChange(nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount() {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL(event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log('Sending to Register Page')
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp() {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponent(STORYBOOK_SCREEN, () => StorybookScreen)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_SCREEN, () => CustomerEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_DETAIL_SCREEN, () => CustomerEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUSTOMER_ENTITY_EDIT_SCREEN, () => CustomerEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TYPE_OF_BUSINESS_ENTITY_SCREEN, () => TypeOfBusinessEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TYPE_OF_BUSINESS_ENTITY_DETAIL_SCREEN, () => TypeOfBusinessEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TYPE_OF_BUSINESS_ENTITY_EDIT_SCREEN, () => TypeOfBusinessEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_SCREEN, () => ProductEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_DETAIL_SCREEN, () => ProductEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PRODUCT_ENTITY_EDIT_SCREEN, () => ProductEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_SCREEN, () => CategoryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_DETAIL_SCREEN, () => CategoryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORY_ENTITY_EDIT_SCREEN, () => CategoryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(LIST_OF_PRICE_ENTITY_SCREEN, () => ListOfPriceEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(LIST_OF_PRICE_ENTITY_DETAIL_SCREEN, () => ListOfPriceEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(LIST_OF_PRICE_ENTITY_EDIT_SCREEN, () => ListOfPriceEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_HEADER_ENTITY_SCREEN, () => OrderHeaderEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_HEADER_ENTITY_DETAIL_SCREEN, () => OrderHeaderEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_HEADER_ENTITY_EDIT_SCREEN, () => OrderHeaderEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_DETAIL_PO_ENTITY_SCREEN, () => OrderDetailPoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_DETAIL_PO_ENTITY_DETAIL_SCREEN, () => OrderDetailPoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ORDER_DETAIL_PO_ENTITY_EDIT_SCREEN, () => OrderDetailPoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_SCREEN, () => NotificationEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_DETAIL_SCREEN, () => NotificationEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(NOTIFICATION_ENTITY_EDIT_SCREEN, () => NotificationEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHECK_NOTIFICATION_ENTITY_SCREEN, () => CheckNotificationEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHECK_NOTIFICATION_ENTITY_DETAIL_SCREEN, () => CheckNotificationEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHECK_NOTIFICATION_ENTITY_EDIT_SCREEN, () => CheckNotificationEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow,
          },
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow,
        },
        background: {
          color: Colors.background,
        },
      },
      sideMenu: {
        left: {
          enabled: false,
        },
      },
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: LOGIN_SCREEN,
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      ],
    },
  })

export const registerScreen = () =>
  Navigation.push('center', {
    component: {
      name: REGISTER_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Sign Up',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const forgotPasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: FORGOT_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Forgot Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const changePasswordScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHANGE_PASSWORD_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Change Password',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const settingsScreen = () =>
  Navigation.push('center', {
    component: {
      name: SETTINGS_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Settings',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const entitiesScreen = () =>
  Navigation.push('center', {
    component: {
      name: ENTITIES_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Entities',
            color: Colors.snow,
          },
        },
      },
    },
  })
export const storybookScreen = () => {
  Navigation.push('center', {
    component: {
      name: STORYBOOK_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Storybook',
            color: Colors.snow,
          },
        },
      },
    },
  })
}

export const customerEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Customers',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'customerCreateButton',
            },
          ],
        },
      },
    },
  })

export const customerEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Customers',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const customerEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CUSTOMER_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Customers',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const typeOfBusinessEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: TYPE_OF_BUSINESS_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'TypeOfBusinesses',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'typeOfBusinessCreateButton',
            },
          ],
        },
      },
    },
  })

export const typeOfBusinessEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: TYPE_OF_BUSINESS_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'TypeOfBusinesses',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const typeOfBusinessEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: TYPE_OF_BUSINESS_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'TypeOfBusinesses',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const productEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: PRODUCT_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Products',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'productCreateButton',
            },
          ],
        },
      },
    },
  })

export const productEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: PRODUCT_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Products',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const productEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: PRODUCT_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Products',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const categoryEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: CATEGORY_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Categories',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'categoryCreateButton',
            },
          ],
        },
      },
    },
  })

export const categoryEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CATEGORY_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Categories',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const categoryEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CATEGORY_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Categories',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const listOfPriceEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: LIST_OF_PRICE_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'ListOfPrices',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'listOfPriceCreateButton',
            },
          ],
        },
      },
    },
  })

export const listOfPriceEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: LIST_OF_PRICE_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ListOfPrices',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const listOfPriceEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: LIST_OF_PRICE_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'ListOfPrices',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const orderHeaderEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ORDER_HEADER_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'OrderHeaders',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'orderHeaderCreateButton',
            },
          ],
        },
      },
    },
  })

export const orderHeaderEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ORDER_HEADER_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'OrderHeaders',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const orderHeaderEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ORDER_HEADER_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'OrderHeaders',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const orderDetailPoEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: ORDER_DETAIL_PO_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'OrderDetailPos',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'orderDetailPoCreateButton',
            },
          ],
        },
      },
    },
  })

export const orderDetailPoEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ORDER_DETAIL_PO_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'OrderDetailPos',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const orderDetailPoEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: ORDER_DETAIL_PO_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'OrderDetailPos',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const notificationEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: NOTIFICATION_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'Notifications',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'notificationCreateButton',
            },
          ],
        },
      },
    },
  })

export const notificationEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: NOTIFICATION_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Notifications',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const notificationEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: NOTIFICATION_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'Notifications',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const checkNotificationEntityScreen = () =>
  Navigation.push('center', {
    component: {
      name: CHECK_NOTIFICATION_ENTITY_SCREEN,
      options: {
        topBar: {
          title: {
            text: 'CheckNotifications',
            color: Colors.snow,
          },
          rightButtons: [
            {
              id: 'createButton',
              text: 'Create',
              color: Colors.snow,
              testID: 'checkNotificationCreateButton',
            },
          ],
        },
      },
    },
  })

export const checkNotificationEntityEditScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CHECK_NOTIFICATION_ENTITY_EDIT_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'CheckNotifications',
            color: Colors.snow,
          },
        },
      },
    },
  })

export const checkNotificationEntityDetailScreen = (data) =>
  Navigation.push('center', {
    component: {
      name: CHECK_NOTIFICATION_ENTITY_DETAIL_SCREEN,
      passProps: {
        data,
      },
      options: {
        topBar: {
          title: {
            text: 'CheckNotifications',
            color: Colors.snow,
          },
        },
      },
    },
  })
// ignite-jhipster-navigation-method-needle
