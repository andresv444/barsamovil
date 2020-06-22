const Utils = require('../utils')

describe('ListOfPrice Screen Tests', () => {
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
    await navigateToListOfPriceScreen()
  })

  const navigateToListOfPriceScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('listOfPriceEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('listOfPriceEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('listOfPriceScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('listOfPriceCreateButton')).tap()
    await Utils.scrollTo('descriptionInput', 'listOfPriceEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data')
    await Utils.scrollTo('percentInput', 'listOfPriceEditScrollView')
    await element(by.id('percentInput')).replaceText('123')
    await Utils.scrollTo('priceInput', 'listOfPriceEditScrollView')
    await element(by.id('priceInput')).replaceText('123')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('description', 'listOfPriceDetailScrollView')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data')
    await Utils.scrollTo('percent', 'listOfPriceDetailScrollView')
    await expect(element(by.id('percent'))).toHaveText('Percent: 123')
    await Utils.scrollTo('price', 'listOfPriceDetailScrollView')
    await expect(element(by.id('price'))).toHaveText('Price: 123')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('descriptionInput', 'listOfPriceEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data-2')
    await Utils.scrollTo('percentInput', 'listOfPriceEditScrollView')
    await element(by.id('percentInput')).replaceText('1234')
    await Utils.scrollTo('priceInput', 'listOfPriceEditScrollView')
    await element(by.id('priceInput')).replaceText('1234')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('description'))).toHaveText('Description: sample-data-2')
    await expect(element(by.id('percent'))).toHaveText('Percent: 1234')
    await expect(element(by.id('price'))).toHaveText('Price: 1234')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('listOfPriceScreen'))).toBeVisible()
  })
})
