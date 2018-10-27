import React, { Component } from 'react'
import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import vanillaIntegration from './vanilla-integration'
import reduxLogdown from 'redux-logdown'
// import logger from './plugins/simple-logger'
import debug from './plugins/debug'
import visualize from './plugins/visualize'
import { paramsParse } from 'analytics-utils'
import './App.css'

console.log('reduxLogdown', reduxLogdown)

const params = paramsParse()

console.log('params', params)

export default class App extends Component {
  componentDidMount() {
    const analytics = analyticsLib({
      app: 'doggieDating',
      version: 100,
      debug: true,
      plugins: [
        debug('analytics'),

        visualize({ nodeId: 'log' }),

        // cancelAction,
        vanillaIntegration({
          trackingId: 'lololo',
        }),
        googleAnalytics({
          trackingId: 'UA-126647663-1',
          // debug: true
        })
      ]
    })

    analytics.ready(() => {
      console.log('ready')

    })

    analytics.disableIntegration('vanilla')

    // analytics.on('*', (action, store) => {
    //   console.log('on', action)
    // })

    // analytics.on('track', (action, store) => {
    //   console.log('on track', action)
    // })

    // analytics.track('lolEvent', () => {
    //   analytics.disableIntegration('vanilla')
    // })
    // analytics.track('two')

    analytics.track('three')


    analytics.track({
      eventName: 'wowza',
      other: 'shit'
    })

    // Simulate 2 sec load on vanilla global
    setTimeout(() => {
      window.vanillaLoaded = true
    }, 1000)

    window.analytics = analytics
  }
  render() {
    return (
      <div className="app">
        <div id='log'></div>
      </div>
    )
  }
}
