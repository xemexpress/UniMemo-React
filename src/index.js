import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import ReactGA from 'react-ga'

import App from './components/App'
import Home from './components/Home'
import Auth from './components/Auth'
import Settings from './components/Settings'
import Profile from './components/Profile'
import ProfileWishes from './components/ProfileWishes'
import ProfileTaken from './components/ProfileTaken'
import Request from './components/Request'
import RequestEditor from './components/RequestEditor'
import Gift from './components/Gift'
import GiftEditor from './components/GiftEditor'
import store from './store'

import {
  GA_TRACKING_ID
} from './constants'

ReactGA.initialize(GA_TRACKING_ID)

function fireTracking(){
  ReactGA.set({
      useId: 523,
      page: window.location.hash
  })
  ReactGA.pageview(window.location.hash)
}

ReactDOM.render((
  <Provider store={store}>
    <Router onUpdate={fireTracking} history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='login' component={Auth} />
        <Route path='register' component={Auth} />
        <Route path='settings' component={Settings} />
        <Route path='@:username/taken' component={ProfileTaken} />
        <Route path='@:username' component={Profile} />
        <Route path='@:username/wishes' component={ProfileWishes} />
        <Route path='request/:requestId' component={Request} />
        <Route path='gift/:giftId' component={Gift} />
        <Route path='requestEditor' component={RequestEditor} />
        <Route path='requestEditor/:requestId' component={RequestEditor} />
        <Route path='giftEditor' component={GiftEditor} />
        <Route path='giftEditor/:giftId' component={GiftEditor} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
