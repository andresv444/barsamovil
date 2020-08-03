import React from 'react'
import {ActivityIndicator, Alert, Image, ScrollView, Text, View} from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { categoryEntityEditScreen } from '../../../navigation/layouts'

import CategoryActions from './category.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './category-entity-detail-screen-style'

class CategoryEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getCategory(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetCategories()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Category?',
      'Are you sure you want to delete the Category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteCategory(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.category || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="categoryDetailScrollView">
        <Text>ID: {this.props.category.id}</Text>
        <Text testID="code">Code: {this.props.category.code}</Text>
        <Text testID="description">Description: {this.props.category.description}</Text>
        <Text testID="image">Image: {this.props.category.image}</Text>
        <Image source={{uri: `data:image/png;base64,${this.props.category.image}`}}
               style={{width : "100%" , height:"95%" , resizeMode:"contain" , borderRadius:5}}/>
        <RoundedButton text="Edit" onPress={categoryEntityEditScreen.bind(this, { entityId: this.props.category.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.categories.category,
    fetching: state.categories.fetchingOne,
    deleting: state.categories.deleting,
    errorDeleting: state.categories.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (id) => dispatch(CategoryActions.categoryRequest(id)),
    getAllCategories: (options) => dispatch(CategoryActions.categoryAllRequest(options)),
    deleteCategory: (id) => dispatch(CategoryActions.categoryDeleteRequest(id)),
    resetCategories: () => dispatch(CategoryActions.categoryReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEntityDetailScreen)
