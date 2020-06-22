const Utils = require('../utils')

describe('Notification Screen Tests', () => {
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
    await navigateToNotificationScreen()
  })

  const navigateToNotificationScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('notificationEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('notificationEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('notificationScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('notificationCreateButton')).tap()
    await Utils.scrollTo('messageInput', 'notificationEditScrollView')
    await element(by.id('messageInput')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('message', 'notificationDetailScrollView')
    await expect(element(by.id('message'))).toHaveText('Message: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('messageInput', 'notificationEditScrollView')
    await element(by.id('messageInput')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('message'))).toHaveText('Message: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('notificationScreen'))).toBeVisible()
  })
})
