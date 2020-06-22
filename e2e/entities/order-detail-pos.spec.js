const Utils = require('../utils')

describe('OrderDetailPo Screen Tests', () => {
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
    await navigateToOrderDetailPoScreen()
  })

  const navigateToOrderDetailPoScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('orderDetailPoEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('orderDetailPoEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('orderDetailPoScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('orderDetailPoCreateButton')).tap()
    await Utils.scrollTo('positionInput', 'orderDetailPoEditScrollView')
    await element(by.id('positionInput')).replaceText('123')
    await Utils.scrollTo('quantityInput', 'orderDetailPoEditScrollView')
    await element(by.id('quantityInput')).replaceText('123')
    await Utils.scrollTo('totalInput', 'orderDetailPoEditScrollView')
    await element(by.id('totalInput')).replaceText('123')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('position', 'orderDetailPoDetailScrollView')
    await expect(element(by.id('position'))).toHaveText('Position: 123')
    await Utils.scrollTo('quantity', 'orderDetailPoDetailScrollView')
    await expect(element(by.id('quantity'))).toHaveText('Quantity: 123')
    await Utils.scrollTo('total', 'orderDetailPoDetailScrollView')
    await expect(element(by.id('total'))).toHaveText('Total: 123')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('positionInput', 'orderDetailPoEditScrollView')
    await element(by.id('positionInput')).replaceText('1234')
    await Utils.scrollTo('quantityInput', 'orderDetailPoEditScrollView')
    await element(by.id('quantityInput')).replaceText('1234')
    await Utils.scrollTo('totalInput', 'orderDetailPoEditScrollView')
    await element(by.id('totalInput')).replaceText('1234')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('position'))).toHaveText('Position: 1234')
    await expect(element(by.id('quantity'))).toHaveText('Quantity: 1234')
    await expect(element(by.id('total'))).toHaveText('Total: 1234')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('orderDetailPoScreen'))).toBeVisible()
  })
})
