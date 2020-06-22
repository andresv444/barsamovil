const Utils = require('../utils')

describe('TypeOfBusiness Screen Tests', () => {
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
    await navigateToTypeOfBusinessScreen()
  })

  const navigateToTypeOfBusinessScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('typeOfBusinessEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('typeOfBusinessEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('typeOfBusinessScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('typeOfBusinessCreateButton')).tap()
    await Utils.scrollTo('nameInput', 'typeOfBusinessEditScrollView')
    await element(by.id('nameInput')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('name', 'typeOfBusinessDetailScrollView')
    await expect(element(by.id('name'))).toHaveText('Name: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('nameInput', 'typeOfBusinessEditScrollView')
    await element(by.id('nameInput')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('name'))).toHaveText('Name: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('typeOfBusinessScreen'))).toBeVisible()
  })
})
