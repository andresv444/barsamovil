import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { productEntityEditScreen } from '../../../navigation/layouts'

import ProductActions from './product.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './product-entity-detail-screen-style'

class ProductEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getProduct(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetProducts()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Product?',
      'Are you sure you want to delete the Product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteProduct(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.product || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="productDetailScrollView">
        <Text>ID: {this.props.product.id}</Text>
        <Text testID="code">Code: {this.props.product.code}</Text>
        <Text testID="dateCreation">DateCreation: {String(this.props.product.dateCreation)}</Text>
        <Text testID="dateLastChange">DateLastChange: {String(this.props.product.dateLastChange)}</Text>
        <Text testID="description">Description: {this.props.product.description}</Text>
        <Text testID="smallImage">SmallImage: {this.props.product.smallImage}</Text>
        <Text testID="mediumImage">MediumImage: {this.props.product.mediumImage}</Text>
        <Text testID="measureType">MeasureType: {this.props.product.measureType}</Text>
        <Text testID="quantity">Quantity: {this.props.product.quantity}</Text>
        <Text testID="price">Price: {this.props.product.price}</Text>
        <Text testID="lastPrice">LastPrice: {this.props.product.lastPrice}</Text>
        <Text testID="tax1">Tax1: {this.props.product.tax1}</Text>
        <Text testID="tax2">Tax2: {this.props.product.tax2}</Text>
        <RoundedButton text="Edit" onPress={productEntityEditScreen.bind(this, { entityId: this.props.product.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    fetching: state.products.fetchingOne,
    deleting: state.products.deleting,
    errorDeleting: state.products.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(ProductActions.productRequest(id)),
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    deleteProduct: (id) => dispatch(ProductActions.productDeleteRequest(id)),
    resetProducts: () => dispatch(ProductActions.productReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEntityDetailScreen)
