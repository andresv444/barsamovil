import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { checkNotificationEntityDetailScreen, checkNotificationEntityEditScreen } from '../../../navigation/layouts'
import CheckNotificationActions from './check-notification.reducer'
import styles from './check-notification-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://reactnative.dev/docs/flatlist.html

class CheckNotificationEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
    }
  }

  navigationButtonPressed({ buttonId }) {
    checkNotificationEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={checkNotificationEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  // Render a header
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No CheckNotifications Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchCheckNotifications = () => {
    this.props.getAllCheckNotifications({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.props.checkNotifications.length) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchCheckNotifications()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="checkNotificationScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.checkNotifications}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          /* ListHeaderComponent={this.renderHeader} */
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    checkNotifications: state.checkNotifications.checkNotifications,
    fetching: state.checkNotifications.fetchingAll,
    error: state.checkNotifications.errorAll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCheckNotifications: (options) => dispatch(CheckNotificationActions.checkNotificationAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckNotificationEntityScreen)
