import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { connect } from 'react-redux'

import Header from './Header'
import agent from '../agent'

import {
  REDIRECT,
  APP_LOAD
} from '../constants'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD,
    payload,
    token
  }),
  onRedirect: () => dispatch({
    type: REDIRECT
  })
})

class App extends React.Component {
  componentWillMount(){
    const token = window.localStorage.getItem('jwt')
    if(token){
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.redirectTo){
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  render(){
    if(this.props.appLoaded){
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          {this.props.children}
        </div>
      )
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <div className='text-xs-center' style={{ margin: '100px' }}>
          <Ionicon icon="ion-qr-scanner" color="#5CB85C" fontSize="57px" rotate={true} />
          <br/>
          <span className='logo-font loading'>Loading...</span>
        </div>
      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
