import React from 'react'
import { FlatList, Text, TouchableOpacity, View, Image,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { productEntityDetailScreen, productEntityEditScreen } from '../../../navigation/layouts'
import ProductActions from './product.reducer'
import styles from './product-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { SearchBar } from 'react-native-elements'

// More info here: https://reactnative.dev/docs/flatlist.html

class ProductEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      // searchTxt: '',
    }
  }
  showSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  }
  navigationButtonPressed({ buttonId }) {
    // productEntityEditScreen({ entityId: null })
    this.showSideMenu()
  }
  componentDidAppear() {

    this.setState({ page: 0 }, () => {
      this.handleLoadMore()
    })
  }

  renderRow({ item }) {

    return (
      // <TouchableOpacity onPress={productEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles2.productMain}>
          <View style={{width:"35%", height:200 }}>
            <Image source={{uri: `data:image/png;base64,${item.smallImage}`}}
                   style={{width : "100%" , height:"95%" , resizeMode:"contain" , borderRadius:5}}/>
          </View>
          <View style={{width:"65%", justifyContent: "space-around",alignContent:"center", marginLeft:10  }}>
          <Text numberOfLines={2} style={styles2.text}>{item.description}</Text>
          </View>
          {/*<View style={{ justifyContent: "space-around", alignContent:"center",  marginLeft:20,}}>*/}
          {/*  <View style={{overFlow:"hidden"}}>*/}
          {/*    <Text numberOfLines={1} style={styles2.text}>{item.description}</Text>*/}
          {/*  </View>*/}
          {/*</View>*/}
        </View>
      // </TouchableOpacity>
    )
  }

  loadBooks = ({ item })=>{
    return (
      <TouchableOpacity>
        <View style={styles2.productMain}>
          <View style={{width:"35%", height:200 }}>
            <Image source={{uri: `data:image/png;base64,${item.smallImage}`}}
                   style={{width : "100%" , height:"95%" , resizeMode:"contain" , borderRadius:5}}/>
          </View>
          <View style={{ justifyContent: "space-around", alignContent:"center",  marginLeft:20,}}>
            <View style={{overFlow:"hidden"}}>
              <Text numberOfLines={1} style={styles2.text}>{item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // Render a header
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No Products Found" show={!this.props.fetching} />

  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  fetchProducts = () => {
    this.props.getAllProducts({ page: this.state.page - 1, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.page < this.props.links.next || this.props.links.next === undefined || this.props.fetching) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchProducts()
      },
    )
  }

  //Permite realizar las busquedas
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Que quieres pedir hoy"
        lightTheme
        round
        editable={true}
        value={this.state.searchTxt}
        onChangeText={this.updateSearch_s}
      />
    )
  }

  updateSearch_s = (search) => {
    this.setState({ searchTxt: search })
    console.log(search)
    this.props.getFilterProducts(search)
    // this.setState({ search })
  }
  render() {
    return (
      // <View testID="productScreen">
      <View style={styles.main}>
        <FlatList
           // data={ this.props.products  }
          data={ this.props.searchTxt.length > 0 ? this.props.productsFilter : this.props.products }
          renderItem={this.renderRow}
           keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
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
    products: state.products.products,
    productsFilter: state.products.productsFilter,
    fetching: state.products.fetchingAll,
    error: state.products.errorAll,
    links: state.products.links,
    searchTxt: state.products.searchTxt === null ? '' : state.products.searchTxt,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: (options) => dispatch(ProductActions.productAllRequest(options)),
    getFilterProducts: (searchTxt) => dispatch(ProductActions.productFilter(searchTxt)),
  }
}

const styles2 = StyleSheet.create({
  main: {
    flex : 1,
    padding : 10,
  },
  bookMain :{
    marginTop:10,
    width : "100%",
    height:500,
    borderColor:"black" , borderWidth:1,
    borderRadius : 5
  },
  productMain: {
    flexDirection:"row",
    justifyContent:"flex-start",
    borderBottomColor:"gray",
    borderBottomWidth:1,
    marginBottom:5
  },
  text : {
    color:"black",
    fontFamily : "halfmoon_bold",
    fontSize: 15,
    fontWeight:"bold",
    overflow:"hidden",
    width:"90%",

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEntityScreen)
