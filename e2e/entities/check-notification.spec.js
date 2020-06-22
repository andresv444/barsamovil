const Utils = require('../utils')

describe('CheckNotification Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await Utils.goBack()
    await Utils.goBack()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToCheckNotificationScreen()
  })

  const navigateToCheckNotificationScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('checkNotificationEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('checkNotificationEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('checkNotificationScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('checkNotificationCreateButton')).tap()
    await Utils.scrollTo('mailCustomerInput', 'checkNotificationEditScrollView')
    await element(by.id('mailCustomerInput')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('mailCustomer', 'checkNotificationDetailScrollView')
    await expect(element(by.id('mailCustomer'))).toHaveText('MailCustomer: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('mailCustomerInput', 'checkNotificationEditScrollView')
    await element(by.id('mailCustomerInput')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('mailCustomer'))).toHaveText('MailCustomer: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('checkNotificationScreen'))).toBeVisible()
  })
})
