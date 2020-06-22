import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import CustomerActions from './customer.reducer'
import TypeOfBusinessActions from '../type-of-business/type-of-business.reducer'
import ListOfPricesActions from '../list-of-prices/list-of-prices.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { customerEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './customer-entity-edit-screen-style'

let Form = t.form.Form
const TypeDoc = t.enums({
  DocIdentidad: 'DocIdentidad',
  Cedula: 'Cedula',
  Nit: 'Nit',
  Pasaporte: 'Pasaporte',
})

class CustomerEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        typeDoc: t.maybe(TypeDoc),
        noIdentification: t.maybe(t.Number),
        companyName: t.maybe(t.String),
        firstName: t.maybe(t.String),
        lastName: t.maybe(t.String),
        address: t.maybe(t.String),
        city: t.maybe(t.String),
        phone: t.maybe(t.String),
        cellPhone: t.maybe(t.String),
        email: t.maybe(t.String),
        userid: t.maybe(t.Number),
        typeOfBusinessId: this.getTypeOfBusinesses(),
        listOfPricesId: this.getListOfPrices(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          typeOfBusinessId: {
            testID: 'typeOfBusinessIdInput',
            label: 'TypeOfBusiness',
          },
          listOfPricesId: {
            testID: 'listOfPricesIdInput',
            label: 'ListOfPrices',
          },
          typeDoc: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('noIdentification').refs.input.focus(),
            testID: 'typeDocInput',
          },
          noIdentification: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('companyName').refs.input.focus(),
            testID: 'noIdentificationInput',
          },
          companyName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('firstName').refs.input.focus(),
            testID: 'companyNameInput',
          },
          firstName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('lastName').refs.input.focus(),
            testID: 'firstNameInput',
          },
          lastName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('address').refs.input.focus(),
            testID: 'lastNameInput',
          },
          address: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('city').refs.input.focus(),
            testID: 'addressInput',
          },
          city: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('phone').refs.input.focus(),
            testID: 'cityInput',
          },
          phone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('cellPhone').refs.input.focus(),
            testID: 'phoneInput',
          },
          cellPhone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('email').refs.input.focus(),
            testID: 'cellPhoneInput',
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('userid').refs.input.focus(),
            testID: 'emailInput',
          },
          userid: {
            testID: 'useridInput',
          },
        },
      },
      customer: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getCustomer(props.data.entityId)
    }
    this.props.getAllTypeOfBusinesses()
    this.props.getAllListOfPrices()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.customer !== prevState.customer && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.customer), customer: nextProps.customer }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.customer.id
        this.props.reset()
        this.props.getCustomer(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: customerEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getTypeOfBusinesses = () => {
    const typeOfBusinesses = {}
    this.props.typeOfBusinesses.forEach((typeOfBusiness) => {
      typeOfBusinesses[typeOfBusiness.id] = typeOfBusiness.id ? typeOfBusiness.id.toString() : typeOfBusiness.id.toString()
    })
    return t.maybe(t.enums(typeOfBusinesses))
  }
  getListOfPrices = () => {
    const listOfPrices = {}
    this.props.listOfPrices.forEach((listOfPrices) => {
      listOfPrices[listOfPrices.id] = listOfPrices.id ? listOfPrices.id.toString() : listOfPrices.id.toString()
    })
    return t.maybe(t.enums(listOfPrices))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const customer = this.form.getValue()
    if (customer) {
      // if validation fails, value will be null
      this.props.updateCustomer(formValueToEntity(customer))
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
        <KeyboardAwareScrollView testID="customerEditScrollView">
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
    typeDoc: value.typeDoc || null,
    noIdentification: value.noIdentification || null,
    companyName: value.companyName || null,
    firstName: value.firstName || null,
    lastName: value.lastName || null,
    address: value.address || null,
    city: value.city || null,
    phone: value.phone || null,
    cellPhone: value.cellPhone || null,
    email: value.email || null,
    userid: value.userid || null,
    typeOfBusinessId: value.typeOfBusiness && value.typeOfBusiness.id ? value.typeOfBusiness.id : null,
    listOfPricesId: value.listOfPrices && value.listOfPrices.id ? value.listOfPrices.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    typeDoc: value.typeDoc || null,
    noIdentification: value.noIdentification || null,
    companyName: value.companyName || null,
    firstName: value.firstName || null,
    lastName: value.lastName || null,
    address: value.address || null,
    city: value.city || null,
    phone: value.phone || null,
    cellPhone: value.cellPhone || null,
    email: value.email || null,
    userid: value.userid || null,
  }
  if (value.typeOfBusinessId) {
    entity.typeOfBusiness = { id: value.typeOfBusinessId }
  }
  if (value.listOfPricesId) {
    entity.listOfPrices = { id: value.listOfPricesId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    typeOfBusinesses: state.typeOfBusinesses.typeOfBusinesses || [],
    listOfPrices: state.listOfPrices.listOfPrices || [],
    customer: state.customers.customer,
    fetching: state.customers.fetchingOne,
    updating: state.customers.updating,
    error: state.customers.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTypeOfBusinesses: (options) => dispatch(TypeOfBusinessActions.typeOfBusinessAllRequest(options)),
    getAllListOfPrices: (options) => dispatch(ListOfPricesActions.listOfPricesAllRequest(options)),
    getCustomer: (id) => dispatch(CustomerActions.customerRequest(id)),
    getAllCustomers: (options) => dispatch(CustomerActions.customerAllRequest(options)),
    updateCustomer: (customer) => dispatch(CustomerActions.customerUpdateRequest(customer)),
    reset: () => dispatch(CustomerActions.customerReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEntityEditScreen)
