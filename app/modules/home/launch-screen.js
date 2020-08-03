import React from 'react'
import { ScrollView, Text, Image, View, Platform } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'


import { connect } from 'react-redux'
import { isLoggedIn } from '../../shared/reducers/account.reducer'
import ProductEntityScreen from "../entities/product/product-entity-screen"

import { productEntityScreen} from '../../navigation/layouts'
export  class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    console.log('El log es=' +this.props.loggedIn)
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
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

    this.showSideMenu()

  }


  render() {
    return (
      <View><Text>Menu principal</Text>

        {this.props.loggedIn?productEntityScreen :<Text>Cerro sesion</Text> }

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account),
  }
}

export default connect(mapStateToProps, null)(LaunchScreen)
