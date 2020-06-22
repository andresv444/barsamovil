import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { checkNotificationEntityEditScreen } from '../../../navigation/layouts'

import CheckNotificationActions from './check-notification.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './check-notification-entity-detail-screen-style'

class CheckNotificationEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getCheckNotification(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetCheckNotifications()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete CheckNotification?',
      'Are you sure you want to delete the CheckNotification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteCheckNotification(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.checkNotification || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="checkNotificationDetailScrollView">
        <Text>ID: {this.props.checkNotification.id}</Text>
        <Text testID="date">Date: {String(this.props.checkNotification.date)}</Text>
        <Text testID="mailCustomer">MailCustomer: {this.props.checkNotification.mailCustomer}</Text>
        <RoundedButton text="Edit" onPress={checkNotificationEntityEditScreen.bind(this, { entityId: this.props.checkNotification.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    checkNotification: state.checkNotifications.checkNotification,
    fetching: state.checkNotifications.fetchingOne,
    deleting: state.checkNotifications.deleting,
    errorDeleting: state.checkNotifications.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCheckNotification: (id) => dispatch(CheckNotificationActions.checkNotificationRequest(id)),
    getAllCheckNotifications: (options) => dispatch(CheckNotificationActions.checkNotificationAllRequest(options)),
    deleteCheckNotification: (id) => dispatch(CheckNotificationActions.checkNotificationDeleteRequest(id)),
    resetCheckNotifications: () => dispatch(CheckNotificationActions.checkNotificationReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckNotificationEntityDetailScreen)
