import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderHeaderEntityDetailScreen, orderHeaderEntityEditScreen } from '../../../navigation/layouts'
import OrderHeaderActions from './order-header.reducer'
import styles from './order-header-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://reactnative.dev/docs/flatlist.html

class OrderHeaderEntityScreen extends React.PureComponent {
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
    orderHeaderEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={orderHeaderEntityDetailScreen.bind(this, { entityId: item.id })}>
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
  renderEmpty = () => <AlertMessage title="No OrderHeaders Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchOrderHeaders = () => {
    this.props.getAllOrderHeaders({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.props.orderHeaders.length) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchOrderHeaders()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="orderHeaderScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.orderHeaders}
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
    orderHeaders: state.orderHeaders.orderHeaders,
    fetching: state.orderHeaders.fetchingAll,
    error: state.orderHeaders.errorAll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrderHeaders: (options) => dispatch(OrderHeaderActions.orderHeaderAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHeaderEntityScreen)
