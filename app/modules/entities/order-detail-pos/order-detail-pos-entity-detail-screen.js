import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderDetailPoEntityEditScreen } from '../../../navigation/layouts'

import OrderDetailPoActions from './order-detail-pos.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-detail-pos-entity-detail-screen-style'

class OrderDetailPoEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderDetailPo(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetOrderDetailPos()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderDetailPo?',
      'Are you sure you want to delete the OrderDetailPo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderDetailPo(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderDetailPo || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="orderDetailPoDetailScrollView">
        <Text>ID: {this.props.orderDetailPo.id}</Text>
        <Text testID="position">Position: {this.props.orderDetailPo.position}</Text>
        <Text testID="quantity">Quantity: {this.props.orderDetailPo.quantity}</Text>
        <Text testID="total">Total: {this.props.orderDetailPo.total}</Text>
        <RoundedButton text="Edit" onPress={orderDetailPoEntityEditScreen.bind(this, { entityId: this.props.orderDetailPo.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetailPo: state.orderDetailPos.orderDetailPo,
    fetching: state.orderDetailPos.fetchingOne,
    deleting: state.orderDetailPos.deleting,
    errorDeleting: state.orderDetailPos.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetailPo: (id) => dispatch(OrderDetailPoActions.orderDetailPoRequest(id)),
    getAllOrderDetailPos: (options) => dispatch(OrderDetailPoActions.orderDetailPoAllRequest(options)),
    deleteOrderDetailPo: (id) => dispatch(OrderDetailPoActions.orderDetailPoDeleteRequest(id)),
    resetOrderDetailPos: () => dispatch(OrderDetailPoActions.orderDetailPoReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPoEntityDetailScreen)
