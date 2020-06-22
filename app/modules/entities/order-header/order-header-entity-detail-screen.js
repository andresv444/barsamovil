import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderHeaderEntityEditScreen } from '../../../navigation/layouts'

import OrderHeaderActions from './order-header.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-header-entity-detail-screen-style'

class OrderHeaderEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderHeader(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetOrderHeaders()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderHeader?',
      'Are you sure you want to delete the OrderHeader?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderHeader(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderHeader || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="orderHeaderDetailScrollView">
        <Text>ID: {this.props.orderHeader.id}</Text>
        <Text testID="dateCreation">DateCreation: {String(this.props.orderHeader.dateCreation)}</Text>
        <Text testID="dateLastChange">DateLastChange: {String(this.props.orderHeader.dateLastChange)}</Text>
        <Text testID="dateDelivery">DateDelivery: {String(this.props.orderHeader.dateDelivery)}</Text>
        <Text testID="orderNumber">OrderNumber: {this.props.orderHeader.orderNumber}</Text>
        <Text testID="description">Description: {this.props.orderHeader.description}</Text>
        <Text testID="status">Status: {this.props.orderHeader.status}</Text>
        <Text testID="grossTotal">GrossTotal: {this.props.orderHeader.grossTotal}</Text>
        <Text testID="tax1Total">Tax1Total: {this.props.orderHeader.tax1Total}</Text>
        <Text testID="tax2Total">Tax2Total: {this.props.orderHeader.tax2Total}</Text>
        <Text testID="total">Total: {this.props.orderHeader.total}</Text>
        <RoundedButton text="Edit" onPress={orderHeaderEntityEditScreen.bind(this, { entityId: this.props.orderHeader.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderHeader: state.orderHeaders.orderHeader,
    fetching: state.orderHeaders.fetchingOne,
    deleting: state.orderHeaders.deleting,
    errorDeleting: state.orderHeaders.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderHeader: (id) => dispatch(OrderHeaderActions.orderHeaderRequest(id)),
    getAllOrderHeaders: (options) => dispatch(OrderHeaderActions.orderHeaderAllRequest(options)),
    deleteOrderHeader: (id) => dispatch(OrderHeaderActions.orderHeaderDeleteRequest(id)),
    resetOrderHeaders: () => dispatch(OrderHeaderActions.orderHeaderReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHeaderEntityDetailScreen)
