import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderHeaderActions from './order-header.reducer'
import CustomerActions from '../customer/customer.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderHeaderEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-header-entity-edit-screen-style'

let Form = t.form.Form
const StatusOrder = t.enums({
  Completed: 'Completed',
  Pending: 'Pending',
  Cancelled: 'Cancelled',
  OnHold: 'OnHold',
})

class OrderHeaderEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        dateCreation: t.maybe(t.Date),
        dateLastChange: t.maybe(t.Date),
        dateDelivery: t.maybe(t.Date),
        orderNumber: t.maybe(t.Number),
        description: t.maybe(t.String),
        status: t.maybe(StatusOrder),
        grossTotal: t.maybe(t.Number),
        tax1Total: t.maybe(t.Number),
        tax2Total: t.maybe(t.Number),
        total: t.maybe(t.Number),
        customerId: this.getCustomers(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          customerId: {
            testID: 'customerIdInput',
            label: 'Customer',
          },
          dateCreation: {
            mode: 'date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dateLastChange').refs.input.focus(),
            testID: 'dateCreationInput',
          },
          dateLastChange: {
            mode: 'date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dateDelivery').refs.input.focus(),
            testID: 'dateLastChangeInput',
          },
          dateDelivery: {
            mode: 'date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('orderNumber').refs.input.focus(),
            testID: 'dateDeliveryInput',
          },
          orderNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'orderNumberInput',
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('status').refs.input.focus(),
            testID: 'descriptionInput',
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('grossTotal').refs.input.focus(),
            testID: 'statusInput',
          },
          grossTotal: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('tax1Total').refs.input.focus(),
            testID: 'grossTotalInput',
          },
          tax1Total: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('tax2Total').refs.input.focus(),
            testID: 'tax1TotalInput',
          },
          tax2Total: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('total').refs.input.focus(),
            testID: 'tax2TotalInput',
          },
          total: {
            testID: 'totalInput',
          },
        },
      },
      orderHeader: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderHeader(props.data.entityId)
    }
    this.props.getAllCustomers()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderHeader !== prevState.orderHeader && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderHeader), orderHeader: nextProps.orderHeader }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.orderHeader.id
        this.props.reset()
        this.props.getOrderHeader(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderHeaderEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getCustomers = () => {
    const customers = {}
    this.props.customers.forEach((customer) => {
      customers[customer.id] = customer.id ? customer.id.toString() : customer.id.toString()
    })
    return t.maybe(t.enums(customers))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const orderHeader = this.form.getValue()
    if (orderHeader) {
      // if validation fails, value will be null
      this.props.updateOrderHeader(formValueToEntity(orderHeader))
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
        <KeyboardAwareScrollView testID="orderHeaderEditScrollView">
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
    dateCreation: value.dateCreation || null,
    dateLastChange: value.dateLastChange || null,
    dateDelivery: value.dateDelivery || null,
    orderNumber: value.orderNumber || null,
    description: value.description || null,
    status: value.status || null,
    grossTotal: value.grossTotal || null,
    tax1Total: value.tax1Total || null,
    tax2Total: value.tax2Total || null,
    total: value.total || null,
    customerId: value.customer && value.customer.id ? value.customer.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    dateCreation: value.dateCreation || null,
    dateLastChange: value.dateLastChange || null,
    dateDelivery: value.dateDelivery || null,
    orderNumber: value.orderNumber || null,
    description: value.description || null,
    status: value.status || null,
    grossTotal: value.grossTotal || null,
    tax1Total: value.tax1Total || null,
    tax2Total: value.tax2Total || null,
    total: value.total || null,
  }
  if (value.customerId) {
    entity.customer = { id: value.customerId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers.customers || [],
    orderHeader: state.orderHeaders.orderHeader,
    fetching: state.orderHeaders.fetchingOne,
    updating: state.orderHeaders.updating,
    error: state.orderHeaders.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
    getOrderHeader: (id) => dispatch(OrderHeaderActions.orderHeaderRequest(id)),
    getAllOrderHeaders: (options) => dispatch(OrderHeaderActions.orderHeaderAllRequest(options)),
    updateOrderHeader: (orderHeader) => dispatch(OrderHeaderActions.orderHeaderUpdateRequest(orderHeader)),
    reset: () => dispatch(OrderHeaderActions.orderHeaderReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHeaderEntityEditScreen)
