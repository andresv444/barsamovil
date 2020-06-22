import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import ProductActions from './product.reducer'
import CategoryActions from '../category/category.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { productEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './product-entity-edit-screen-style'

let Form = t.form.Form
const MeasureType = t.enums({
  Unidad: 'Unidad',
  Caja: 'Caja',
})

class ProductEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        code: t.maybe(t.String),
        dateCreation: t.maybe(t.Date),
        dateLastChange: t.maybe(t.Date),
        description: t.maybe(t.String),
        smallImage: t.maybe(t.String),
        mediumImage: t.maybe(t.String),
        measureType: t.maybe(MeasureType),
        quantity: t.maybe(t.Number),
        price: t.maybe(t.Number),
        lastPrice: t.maybe(t.Number),
        tax1: t.maybe(t.Number),
        tax2: t.maybe(t.Number),
        categoryId: this.getCategories(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          categoryId: {
            testID: 'categoryIdInput',
            label: 'Category',
          },
          code: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('dateCreation').refs.input.focus(),
            testID: 'codeInput',
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
            onSubmitEditing: () => this.form.getComponent('description').refs.input.focus(),
            testID: 'dateLastChangeInput',
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('smallImage').refs.input.focus(),
            testID: 'descriptionInput',
          },
          smallImage: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('mediumImage').refs.input.focus(),
            testID: 'smallImageInput',
          },
          mediumImage: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('measureType').refs.input.focus(),
            testID: 'mediumImageInput',
          },
          measureType: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('quantity').refs.input.focus(),
            testID: 'measureTypeInput',
          },
          quantity: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('price').refs.input.focus(),
            testID: 'quantityInput',
          },
          price: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('lastPrice').refs.input.focus(),
            testID: 'priceInput',
          },
          lastPrice: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('tax1').refs.input.focus(),
            testID: 'lastPriceInput',
          },
          tax1: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('tax2').refs.input.focus(),
            testID: 'tax1Input',
          },
          tax2: {
            testID: 'tax2Input',
          },
        },
      },
      product: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getProduct(props.data.entityId)
    }
    this.props.getAllCategories()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.product !== prevState.product && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.product), product: nextProps.product }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.product.id
        this.props.reset()
        this.props.getProduct(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: productEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getCategories = () => {
    const categories = {}
    this.props.categories.forEach((category) => {
      categories[category.id] = category.id ? category.id.toString() : category.id.toString()
    })
    return t.maybe(t.enums(categories))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const product = this.form.getValue()
    if (product) {
      // if validation fails, value will be null
      this.props.updateProduct(formValueToEntity(product))
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
        <KeyboardAwareScrollView testID="productEditScrollView">
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
    dateCreation: value.dateCreation || null,
    dateLastChange: value.dateLastChange || null,
    description: value.description || null,
    smallImage: value.smallImage || null,
    mediumImage: value.mediumImage || null,
    measureType: value.measureType || null,
    quantity: value.quantity || null,
    price: value.price || null,
    lastPrice: value.lastPrice || null,
    tax1: value.tax1 || null,
    tax2: value.tax2 || null,
    categoryId: value.category && value.category.id ? value.category.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    code: value.code || null,
    dateCreation: value.dateCreation || null,
    dateLastChange: value.dateLastChange || null,
    description: value.description || null,
    smallImage: value.smallImage || null,
    mediumImage: value.mediumImage || null,
    measureType: value.measureType || null,
    quantity: value.quantity || null,
    price: value.price || null,
    lastPrice: value.lastPrice || null,
    tax1: value.tax1 || null,
    tax2: value.tax2 || null,
  }
  if (value.categoryId) {
    entity.category = { id: value.categoryId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories || [],
    product: state.products.product,
    fetching: state.products.fetchingOne,
    updating: state.products.updating,
    error: state.products.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: (options) => dispatch(CategoryActions.categoryAllRequest(options)),
    getProduct: (id) => dispatch(ProductActions.productRequest(id)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    updateProduct: (product) => dispatch(ProductActions.productUpdateRequest(product)),
    reset: () => dispatch(ProductActions.productReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEntityEditScreen)
