import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderDetailPoEntityDetailScreen, orderDetailPoEntityEditScreen } from '../../../navigation/layouts'
import OrderDetailPoActions from './order-detail-pos.reducer'
import styles from './order-detail-pos-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://reactnative.dev/docs/flatlist.html

class OrderDetailPoEntityScreen extends React.PureComponent {
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
    orderDetailPoEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={orderDetailPoEntityDetailScreen.bind(this, { entityId: item.id })}>
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
  renderEmpty = () => <AlertMessage title="No OrderDetailPos Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchOrderDetailPos = () => {
    this.props.getAllOrderDetailPos({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.props.orderDetailPos.length) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchOrderDetailPos()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="orderDetailPoScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.orderDetailPos}
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
    orderDetailPos: state.orderDetailPos.orderDetailPos,
    fetching: state.orderDetailPos.fetchingAll,
    error: state.orderDetailPos.errorAll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrderDetailPos: (options) => dispatch(OrderDetailPoActions.orderDetailPoAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailPoEntityScreen)
