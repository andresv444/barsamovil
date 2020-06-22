import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ListOfPriceActions from './list-of-prices.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { listOfPriceEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './list-of-prices-entity-edit-screen-style'

let Form = t.form.Form

class ListOfPriceEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        description: t.maybe(t.String),
        percent: t.maybe(t.Number),
        price: t.maybe(t.Number),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('percent').refs.input.focus(),
            testID: 'descriptionInput',
          },
          percent: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('price').refs.input.focus(),
            testID: 'percentInput',
          },
          price: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'priceInput',
          },
        },
      },
      listOfPrice: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getListOfPrice(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.listOfPrice !== prevState.listOfPrice && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.listOfPrice), listOfPrice: nextProps.listOfPrice }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.listOfPrice.id
        this.props.reset()
        this.props.getListOfPrice(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: listOfPriceEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const listOfPrice = this.form.getValue()
    if (listOfPrice) {
      // if validation fails, value will be null
      this.props.updateListOfPrice(formValueToEntity(listOfPrice))
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
        <KeyboardAwareScrollView testID="listOfPriceEditScrollView">
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
    description: value.description || null,
    percent: value.percent || null,
    price: value.price || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    description: value.description || null,
    percent: value.percent || null,
    price: value.price || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    listOfPrice: state.listOfPrices.listOfPrice,
    fetching: state.listOfPrices.fetchingOne,
    updating: state.listOfPrices.updating,
    error: state.listOfPrices.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListOfPrice: (id) => dispatch(ListOfPriceActions.listOfPriceRequest(id)),
    getAllListOfPrices: (options) => dispatch(ListOfPriceActions.listOfPriceAllRequest(options)),
    updateListOfPrice: (listOfPrice) => dispatch(ListOfPriceActions.listOfPriceUpdateRequest(listOfPrice)),
    reset: () => dispatch(ListOfPriceActions.listOfPriceReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPriceEntityEditScreen)
