import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { typeOfBusinessEntityEditScreen } from '../../../navigation/layouts'

import TypeOfBusinessActions from './type-of-business.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './type-of-business-entity-detail-screen-style'

class TypeOfBusinessEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getTypeOfBusiness(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetTypeOfBusinesses()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete TypeOfBusiness?',
      'Are you sure you want to delete the TypeOfBusiness?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteTypeOfBusiness(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.typeOfBusiness || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="typeOfBusinessDetailScrollView">
        <Text>ID: {this.props.typeOfBusiness.id}</Text>
        <Text testID="name">Name: {this.props.typeOfBusiness.name}</Text>
        <RoundedButton text="Edit" onPress={typeOfBusinessEntityEditScreen.bind(this, { entityId: this.props.typeOfBusiness.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    typeOfBusiness: state.typeOfBusinesses.typeOfBusiness,
    fetching: state.typeOfBusinesses.fetchingOne,
    deleting: state.typeOfBusinesses.deleting,
    errorDeleting: state.typeOfBusinesses.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTypeOfBusiness: (id) => dispatch(TypeOfBusinessActions.typeOfBusinessRequest(id)),
    getAllTypeOfBusinesses: (options) => dispatch(TypeOfBusinessActions.typeOfBusinessAllRequest(options)),
    deleteTypeOfBusiness: (id) => dispatch(TypeOfBusinessActions.typeOfBusinessDeleteRequest(id)),
    resetTypeOfBusinesses: () => dispatch(TypeOfBusinessActions.typeOfBusinessReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeOfBusinessEntityDetailScreen)
