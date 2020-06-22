import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { typeOfBusinessEntityDetailScreen, typeOfBusinessEntityEditScreen } from '../../../navigation/layouts'
import TypeOfBusinessActions from './type-of-business.reducer'
import styles from './type-of-business-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://reactnative.dev/docs/flatlist.html

class TypeOfBusinessEntityScreen extends React.PureComponent {
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
    typeOfBusinessEntityEditScreen({ entityId: null })
  }
  componentDidAppear() {
    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={typeOfBusinessEntityDetailScreen.bind(this, { entityId: item.id })}>
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
  renderEmpty = () => <AlertMessage title="No TypeOfBusinesses Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchTypeOfBusinesses = () => {
    this.props.getAllTypeOfBusinesses({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.props.typeOfBusinesses.length) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchTypeOfBusinesses()
      },
    )
  }

  render() {
    return (
      <View style={styles.container} testID="typeOfBusinessScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.typeOfBusinesses}
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
    typeOfBusinesses: state.typeOfBusinesses.typeOfBusinesses,
    fetching: state.typeOfBusinesses.fetchingAll,
    error: state.typeOfBusinesses.errorAll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTypeOfBusinesses: (options) => dispatch(TypeOfBusinessActions.typeOfBusinessAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeOfBusinessEntityScreen)
