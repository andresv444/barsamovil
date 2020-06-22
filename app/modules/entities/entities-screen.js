import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  loginScreen,
  customerEntityScreen,
  typeOfBusinessEntityScreen,
  productEntityScreen,
  categoryEntityScreen,
  listOfPriceEntityScreen,
  orderHeaderEntityScreen,
  orderDetailPoEntityScreen,
  notificationEntityScreen,
  checkNotificationEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} testID="entityScreenScrollList">
        <Text style={styles.centerText}>JHipster Entities will appear below</Text>
        <RoundedButton text="Customer" onPress={customerEntityScreen} testID="customerEntityScreenButton" />
        <RoundedButton text="TypeOfBusiness" onPress={typeOfBusinessEntityScreen} testID="typeOfBusinessEntityScreenButton" />
        <RoundedButton text="Product" onPress={productEntityScreen} testID="productEntityScreenButton" />
        <RoundedButton text="Category" onPress={categoryEntityScreen} testID="categoryEntityScreenButton" />
        <RoundedButton text="ListOfPrice" onPress={listOfPriceEntityScreen} testID="listOfPriceEntityScreenButton" />
        <RoundedButton text="OrderHeader" onPress={orderHeaderEntityScreen} testID="orderHeaderEntityScreenButton" />
        <RoundedButton text="OrderDetailPo" onPress={orderDetailPoEntityScreen} testID="orderDetailPoEntityScreenButton" />
        <RoundedButton text="Notification" onPress={notificationEntityScreen} testID="notificationEntityScreenButton" />
        <RoundedButton text="CheckNotification" onPress={checkNotificationEntityScreen} testID="checkNotificationEntityScreenButton" />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
