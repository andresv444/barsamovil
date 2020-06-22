import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderDetailPoActions from './order-detail-pos.reducer'
import OrderHeaderActions from '../order-header/order-header.reducer'
import ProductActions from '../product/product.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderDetailPoEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-detail-pos-entity-edit-screen-style'

let Form = t.form.Form

class OrderDetailPoEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        position: t.maybe(t.Number),
        quantity: t.maybe(t.Number),
        total: t.maybe(t.Number),
        orderHeaderId: this.getOrderHeaders(),
        productId: this.getProducts(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          orderHeaderId: {
            testID: 'orderHeaderIdInput',
            label: 'OrderHeader',
          },
          productId: {
            testID: 'productIdInput',
            label: 'Product',
          },
          position: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('quantity').refs.input.focus(),
            testID: 'positionInput',
          },
          quantity: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('total').refs.input.focus(),
            testID: 'quantityInput',
          },
          total: {
            testID: 'totalInput',
          },
        },
      },
      orderDetailPo: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderDetailPo(props.data.entityId)
    }
    this.props.getAllOrderHeaders()
    this.props.getAllProducts()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderDetailPo !== prevState.orderDetailPo && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderDetailPo), orderDetailPo: nextProps.orderDetailPo }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.orderDetailPo.id
        this.props.reset()
        this.props.getOrderDetailPo(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderDetailPoEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getOrderHeaders = () => {
    const orderHeaders = {}
    this.props.orderHeaders.forEach((orderHeader) => {
      orderHeaders[orderHeader.id] = orderHeader.orderNumber ? orderHeader.orderNumber.toString() : orderHeader.id.toString()
    })
    return t.maybe(t.enums(orderHeaders))
  }
  getProducts = () => {
    const products = {}
    this.props.products.forEach((product) => {
      products[product.id] = product.id ? product.id.toString() : product.id.toString()
    })
    return t.maybe(t.enums(products))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const orderDetailPo = this.form.getValue()
    if (orderDetailPo) {
      // if validation fails, value will be null
      this.props.updateOrderDetailPo(formValueToEntity(orderDetailPo))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView testID="orderDetailPoEditScrollView">
          <Form
            ref={(c) => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        </KeyboardAwareScrollView>
        <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    position: value.position || null,
    quantity: value.quantity || null,
    total: value.total || null,
    orderHeaderId: value.orderHeader && value.orderHeader.id ? value.orderHeader.id : null,
    productId: value.product && value.product.id ? value.product.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    position: value.position || null,
    quantity: value.quantity || null,
    total: value.total || null,
  }
  if (value.orderHeaderId) {
    entity.orderHeader = { id: value.orderHeaderId }
  }
  if (value.productId) {
    entity.product = { id: value.productId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    orderHeaders: state.orderHeaders.orderHeaders || [],
    products: state.products.products || [],
    orderDetailPo: state.orderDetailPos.orderDetailPo,
    fetching: state.orderDetailPos.fetchingOne,
    updating: state.orderDetailPos.updating,
    error: state.orderDetailPos.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrderHeaders: (options) => dispatch(OrderHeaderActions.orderHeaderAllRequest(options)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    getOrderDetailPo: (id) => dispatch(OrderDetailPoActions.orderDetailPoRequest(id)),
    getAllOrderDetailPos: (options) => dispatch(OrderDetailPoActions.orderDetailPoAllRequest(options)),
    updateOrderDetailPo: (orderDetailPo) => dispatch(OrderDetailPoActions.orderDetailPoUpdateRequest(orderDetailPo)),
    reset: () => dispatch(OrderDetailPoActions.orderDetailPoReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPoEntityEditScreen)
