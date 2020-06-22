import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import TypeOfBusinessActions from './type-of-business.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { typeOfBusinessEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './type-of-business-entity-edit-screen-style'

let Form = t.form.Form

class TypeOfBusinessEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          name: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'nameInput',
          },
        },
      },
      typeOfBusiness: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getTypeOfBusiness(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.typeOfBusiness !== prevState.typeOfBusiness && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.typeOfBusiness), typeOfBusiness: nextProps.typeOfBusiness }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.typeOfBusiness.id
        this.props.reset()
        this.props.getTypeOfBusiness(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: typeOfBusinessEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const typeOfBusiness = this.form.getValue()
    if (typeOfBusiness) {
      // if validation fails, value will be null
      this.props.updateTypeOfBusiness(formValueToEntity(typeOfBusiness))
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
        <KeyboardAwareScrollView testID="typeOfBusinessEditScrollView">
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
    name: value.name || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    name: value.name || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    typeOfBusiness: state.typeOfBusinesses.typeOfBusiness,
    fetching: state.typeOfBusinesses.fetchingOne,
    updating: state.typeOfBusinesses.updating,
    error: state.typeOfBusinesses.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTypeOfBusiness: (id) => dispatch(TypeOfBusinessActions.typeOfBusinessRequest(id)),
    getAllTypeOfBusinesses: (options) => dispatch(TypeOfBusinessActions.typeOfBusinessAllRequest(options)),
    updateTypeOfBusiness: (typeOfBusiness) => dispatch(TypeOfBusinessActions.typeOfBusinessUpdateRequest(typeOfBusiness)),
    reset: () => dispatch(TypeOfBusinessActions.typeOfBusinessReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeOfBusinessEntityEditScreen)
