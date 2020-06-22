import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { customerEntityEditScreen } from '../../../navigation/layouts'

import CustomerActions from './customer.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './customer-entity-detail-screen-style'

class CustomerEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getCustomer(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetCustomers()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Customer?',
      'Are you sure you want to delete the Customer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteCustomer(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.customer || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="customerDetailScrollView">
        <Text>ID: {this.props.customer.id}</Text>
        <Text testID="typeDoc">TypeDoc: {this.props.customer.typeDoc}</Text>
        <Text testID="noIdentification">NoIdentification: {this.props.customer.noIdentification}</Text>
        <Text testID="companyName">CompanyName: {this.props.customer.companyName}</Text>
        <Text testID="firstName">FirstName: {this.props.customer.firstName}</Text>
        <Text testID="lastName">LastName: {this.props.customer.lastName}</Text>
        <Text testID="address">Address: {this.props.customer.address}</Text>
        <Text testID="city">City: {this.props.customer.city}</Text>
        <Text testID="phone">Phone: {this.props.customer.phone}</Text>
        <Text testID="cellPhone">CellPhone: {this.props.customer.cellPhone}</Text>
        <Text testID="email">Email: {this.props.customer.email}</Text>
        <Text testID="userid">Userid: {this.props.customer.userid}</Text>
        <RoundedButton text="Edit" onPress={customerEntityEditScreen.bind(this, { entityId: this.props.customer.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customers.customer,
    fetching: state.customers.fetchingOne,
    deleting: state.customers.deleting,
    errorDeleting: state.customers.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomer: (id) => dispatch(CustomerActions.customerRequest(id)),
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
    deleteCustomer: (id) => dispatch(CustomerActions.customerDeleteRequest(id)),
    resetCustomers: () => dispatch(CustomerActions.customerReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEntityDetailScreen)
