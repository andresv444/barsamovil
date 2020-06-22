import React from 'react'
import { ActivityIndicator, Alert, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import NotificationActions from './notification.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { notificationEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './notification-entity-edit-screen-style'

let Form = t.form.Form

class NotificationEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        date: t.maybe(t.Date),
        message: t.maybe(t.String),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          date: {
            mode: 'date',
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('message').refs.input.focus(),
            testID: 'dateInput',
          },
          message: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'messageInput',
          },
        },
      },
      notification: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getNotification(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notification !== prevState.notification && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.notification), notification: nextProps.notification }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        const entityId = this.props.notification.id
        this.props.reset()
        this.props.getNotification(entityId)
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: notificationEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const notification = this.form.getValue()
    if (notification) {
      // if validation fails, value will be null
      this.props.updateNotification(formValueToEntity(notification))
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
        <KeyboardAwareScrollView testID="notificationEditScrollView">
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
    message: value.message || null,
  }
}
const formValueToEntity = (value) => {
  const entity = {
    id: value.id || null,
    date: value.date || null,
    message: value.message || null,
  }
  return entity
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    updating: state.notifications.updating,
    error: state.notifications.errorUpdating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    updateNotification: (notification) => dispatch(NotificationActions.notificationUpdateRequest(notification)),
    reset: () => dispatch(NotificationActions.notificationReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEntityEditScreen)
