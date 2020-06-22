import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { listOfPriceEntityDetailScreen, listOfPriceEntityEditScreen } from '../../../navigation/layouts'
import ListOfPriceActions from './list-of-prices.reducer'
import styles from './list-of-prices-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://reactnative.dev/docs/flatlist.html

class ListOfPriceEntityScreen extends React.PureComponent {
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
    listOfPriceEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={listOfPriceEntityDetailScreen.bind(this, { entityId: item.id })}>
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
  renderEmpty = () => <AlertMessage title="No ListOfPrices Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchListOfPrices = () => {
    this.props.getAllListOfPrices({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.props.listOfPrices.length) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchListOfPrices()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="listOfPriceScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.listOfPrices}
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
    listOfPrices: state.listOfPrices.listOfPrices,
    fetching: state.listOfPrices.fetchingAll,
    error: state.listOfPrices.errorAll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListOfPrices: (options) => dispatch(ListOfPriceActions.listOfPriceAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPriceEntityScreen)
