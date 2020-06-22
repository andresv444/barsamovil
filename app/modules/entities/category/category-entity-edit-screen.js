import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import CategoryActions from './category.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { categoryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './category-entity-edit-screen-style'

let Form = t.form.Form

class CategoryEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        code: t.maybe(t.String),
        description: t.maybe(t.String),
        image: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          code: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'codeInput',
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('image').refs.input.focus(),
            testID: 'descriptionInput',
          },
          image: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'imageInput',
          },
        },
      },
      category: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getCategory(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.category !== prevState.category && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.category), category: nextProps.category }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.category.id
        this.props.reset()
        this.props.getCategory(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: categoryEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const category = this.form.getValue()
    if (category) {
      // if validation fails, value will be null
      this.props.updateCategory(formValueToEntity(category))
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
        <KeyboardAwareScrollView testID="categoryEditScrollView">
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
    code: value.code || null,
    description: value.description || null,
    image: value.image || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    code: value.code || null,
    description: value.description || null,
    image: value.image || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    category: state.categories.category,
    fetching: state.categories.fetchingOne,
    updating: state.categories.updating,
    error: state.categories.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (id) => dispatch(CategoryActions.categoryRequest(id)),
    getAllCategories: (options) => dispatch(CategoryActions.categoryAllRequest(options)),
    updateCategory: (category) => dispatch(CategoryActions.categoryUpdateRequest(category)),
    reset: () => dispatch(CategoryActions.categoryReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntityEditScreen)
