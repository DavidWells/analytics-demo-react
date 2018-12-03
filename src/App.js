import React, { Component } from 'react'
import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import vanillaIntegration from './vanilla-integration'
import segmentIntegration from 'analytics-plugin-segment'
// import reduxLogdown from 'redux-logdown'
import logger from './plugins/simple-logger'
import debug from './plugins/debug'
import visualize from './plugins/visualize'
import cancelAction from './plugins/cancelAction'
import { noOp } from 'analytics-utils'
import './App.css'

const analytics = analyticsLib({
  app: 'doggieDating',
  version: 100,
  debug: true,
  plugins: [
    logger,
    debug('analytics'),

    visualize({ nodeId: 'log' }),

    cancelAction,
    vanillaIntegration({
      trackingId: 'lololo',
    }),
    googleAnalytics({
      trackingId: 'UA-126647663-1',
      // debug: true
    }),
    segmentIntegration({
      trackingId: "f3W8BZ0iCGrk1STIsMZV7JXfMGB7aMiW"
    })
  ]
})

export default class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.allListener = noOp
    this.trackListener = noOp
  }
  componentDidMount() {

    // Attach listeners
    analytics.ready(() => {
      console.log('ready')
    })

    // Fire on all events
    this.allListener = analytics.on('*', (action, store) => {
      console.log('* listener: ', action)
    })

    // Fire on specific event
    this.trackListener = analytics.on('track', (action, store) => {
      console.log('track-listener: ', action)
    })

    analytics.on('trackCompleted', (action, store) => {
      console.log('trackCompleted!', action)
      console.log('trackCompleted store', store.getState())
    })

    // analytics.track('lolEvent', () => {
    //   analytics.disableIntegration('vanilla')
    // })
    // analytics.track('two')

    analytics.track('three')


    // Simulate 1 sec load on vanilla global
    setTimeout(() => {
      window.vanillaLoaded = true
      window.SegmentLoaded = true
    }, 1000)

    window.Analytics = analytics
  }
  handleIdentify = () => {
    analytics.identify('xyz-123', {
      traitOne: 'blue',
      traitTwo: 'red'
    })
  }
  handleTrack = () => {
    analytics.track('buttonClick', {
      other: 'wow'
    })
  }
  handlePage = () => {
    analytics.page()
  }
  handleDisable = () => {
    analytics.disableIntegration(['vanilla'], (x) => {
      console.log('disabled!', x)
    })
  }
  handleEnable = () => {
    analytics.enableIntegration(['vanilla'], (x) => {
      console.log('enableIntegration!', x)
    })
  }
  sendMalformattedEvent = () => {
    // Malformatted event
    analytics.track({
      eventName: 'wowza',
      other: 'shit'
    })
  }
  detachAllListener = () => {
    // call the listner again to detach it
    this.allListener()
  }
  detachTrackListener = () => {
    // call the listner again to detach it
    this.trackListener()
  }
  render() {
    return (
      <div className="app">
        <button onClick={this.handleTrack}>
          Track
        </button>
        <button onClick={this.handleIdentify}>
          Identify
        </button>
        <button onClick={this.handlePage}>
          Page
        </button>
        <button onClick={this.handleDisable}>
          Disable vanilla integration
        </button>
        <button onClick={this.handleEnable}>
          Enable vanilla integration
        </button>
        <button onClick={this.detachAllListener}>
          Detach * Listener
        </button>
        <button onClick={this.detachTrackListener}>
          Detach track Listener
        </button>
        <div>
          <a href="/?an_uid=12345">Identify via param</a> |
          <a href="/?an_event=email-click">Track via param</a> |
          <a href="/?an_uid=12345&an_trait_color=blue&an_trait_accountLevel=pro">Identify via param w/ attributes</a>
        </div>
        <div id='log'></div>
      </div>
    )
  }
}
