import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { listOfPriceEntityEditScreen } from '../../../navigation/layouts'

import ListOfPriceActions from './list-of-prices.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './list-of-prices-entity-detail-screen-style'

class ListOfPriceEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getListOfPrice(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetListOfPrices()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete ListOfPrice?',
      'Are you sure you want to delete the ListOfPrice?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteListOfPrice(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.listOfPrice || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="listOfPriceDetailScrollView">
        <Text>ID: {this.props.listOfPrice.id}</Text>
        <Text testID="description">Description: {this.props.listOfPrice.description}</Text>
        <Text testID="percent">Percent: {this.props.listOfPrice.percent}</Text>
        <Text testID="price">Price: {this.props.listOfPrice.price}</Text>
        <RoundedButton text="Edit" onPress={listOfPriceEntityEditScreen.bind(this, { entityId: this.props.listOfPrice.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listOfPrice: state.listOfPrices.listOfPrice,
    fetching: state.listOfPrices.fetchingOne,
    deleting: state.listOfPrices.deleting,
    errorDeleting: state.listOfPrices.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListOfPrice: (id) => dispatch(ListOfPriceActions.listOfPriceRequest(id)),
    getAllListOfPrices: (options) => dispatch(ListOfPriceActions.listOfPriceAllRequest(options)),
    deleteListOfPrice: (id) => dispatch(ListOfPriceActions.listOfPriceDeleteRequest(id)),
    resetListOfPrices: () => dispatch(ListOfPriceActions.listOfPriceReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPriceEntityDetailScreen)
