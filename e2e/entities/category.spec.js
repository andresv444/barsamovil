const Utils = require('../utils')

describe('Category Screen Tests', () => {
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
    await navigateToCategoryScreen()
  })

  const navigateToCategoryScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await Utils.scrollTo('categoryEntityScreenButton', 'entityScreenScrollList')
    await element(by.id('categoryEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('categoryScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.id('categoryCreateButton')).tap()
    await Utils.scrollTo('codeInput', 'categoryEditScrollView')
    await element(by.id('codeInput')).replaceText('sample-data')
    await Utils.scrollTo('descriptionInput', 'categoryEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data')
    await Utils.scrollTo('imageInput', 'categoryEditScrollView')
    await element(by.id('imageInput')).replaceText('sample-data')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await Utils.scrollTo('code', 'categoryDetailScrollView')
    await expect(element(by.id('code'))).toHaveText('Code: sample-data')
    await Utils.scrollTo('description', 'categoryDetailScrollView')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data')
    await Utils.scrollTo('image', 'categoryDetailScrollView')
    await expect(element(by.id('image'))).toHaveText('Image: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await Utils.scrollTo('codeInput', 'categoryEditScrollView')
    await element(by.id('codeInput')).replaceText('sample-data-2')
    await Utils.scrollTo('descriptionInput', 'categoryEditScrollView')
    await element(by.id('descriptionInput')).replaceText('sample-data-2')
    await Utils.scrollTo('imageInput', 'categoryEditScrollView')
    await element(by.id('imageInput')).replaceText('sample-data-2')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('code'))).toHaveText('Code: sample-data-2')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data-2')
    await expect(element(by.id('image'))).toHaveText('Image: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('categoryScreen'))).toBeVisible()
  })
})
