import React, { Component } from 'react'
import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import vanillaIntegration from './vanilla-integration'
import logger from './plugins/logger'
import visualize from './plugins/visualize'
import { paramsParse } from 'analytics-utils'
import logo from './logo.svg'
import './App.css'

// console.log('config', config)

const params = paramsParse()
console.log('params', params)

export default class App extends Component {
  componentDidMount() {
    const analytics = analyticsLib({
      app: 'doggieDating',
      version: 100,
      debug: true,
      plugins: [
        logger,
        visualize,
        // cancelAction,
        vanillaIntegration({
          trackingId: 'lololo',
        }),
        googleAnalytics({
          trackingId: 'UA-126647663-1',
        })
      ]
    })

    // Simulate 2 sec load on vanilla global
    setTimeout(() => {
      window.vanillaLoaded = true
    }, 2000)

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
