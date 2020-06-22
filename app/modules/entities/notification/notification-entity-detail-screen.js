import React from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { notificationEntityEditScreen } from '../../../navigation/layouts'

import NotificationActions from './notification.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './notification-entity-detail-screen-style'

class NotificationEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getNotification(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.resetNotifications()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Notification?',
      'Are you sure you want to delete the Notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteNotification(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.notification || this.props.fetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} testID="notificationDetailScrollView">
        <Text>ID: {this.props.notification.id}</Text>
        <Text testID="date">Date: {String(this.props.notification.date)}</Text>
        <Text testID="message">Message: {this.props.notification.message}</Text>
        <RoundedButton text="Edit" onPress={notificationEntityEditScreen.bind(this, { entityId: this.props.notification.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    deleting: state.notifications.deleting,
    errorDeleting: state.notifications.errorDeleting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    deleteNotification: (id) => dispatch(NotificationActions.notificationDeleteRequest(id)),
    resetNotifications: () => dispatch(NotificationActions.notificationReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEntityDetailScreen)
