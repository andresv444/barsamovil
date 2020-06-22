import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import CheckNotificationActions from './check-notification.reducer'
import NotificationActions from '../notification/notification.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { checkNotificationEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './check-notification-entity-edit-screen-style'

let Form = t.form.Form

class CheckNotificationEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        date: t.maybe(t.Date),
        mailCustomer: t.maybe(t.String),
        notificationId: this.getNotifications(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          notificationId: {
            testID: 'notificationIdInput',
            label: 'Notificacion',
          },
          date: {
            mode: 'date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('mailCustomer').refs.input.focus(),
            testID: 'dateInput',
          },
          mailCustomer: {
            testID: 'mailCustomerInput',
          },
        },
      },
      checkNotification: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getCheckNotification(props.data.entityId)
    }
    this.props.getAllNotifications()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.checkNotification !== prevState.checkNotification && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.checkNotification), checkNotification: nextProps.checkNotification }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.checkNotification.id
        this.props.reset()
        this.props.getCheckNotification(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: checkNotificationEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getNotifications = () => {
    const notifications = {}
    this.props.notifications.forEach((notification) => {
      notifications[notification.id] = notification.id ? notification.id.toString() : notification.id.toString()
    })
    return t.maybe(t.enums(notifications))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const checkNotification = this.form.getValue()
    if (checkNotification) {
      // if validation fails, value will be null
      this.props.updateCheckNotification(formValueToEntity(checkNotification))
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
        <KeyboardAwareScrollView testID="checkNotificationEditScrollView">
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
    date: value.date || null,
    mailCustomer: value.mailCustomer || null,
    notificationId: value.notification && value.notification.id ? value.notification.id : null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    date: value.date || null,
    mailCustomer: value.mailCustomer || null,
  }
  if (value.notificationId) {
    entity.notification = { id: value.notificationId }
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications || [],
    checkNotification: state.checkNotifications.checkNotification,
    fetching: state.checkNotifications.fetchingOne,
    updating: state.checkNotifications.updating,
    error: state.checkNotifications.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    getCheckNotification: (id) => dispatch(CheckNotificationActions.checkNotificationRequest(id)),
    getAllCheckNotifications: (options) => dispatch(CheckNotificationActions.checkNotificationAllRequest(options)),
    updateCheckNotification: (checkNotification) => dispatch(CheckNotificationActions.checkNotificationUpdateRequest(checkNotification)),
    reset: () => dispatch(CheckNotificationActions.checkNotificationReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckNotificationEntityEditScreen)
