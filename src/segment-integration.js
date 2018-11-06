/**
 * Segment analytics integration
 */

/* integration namespace. Must be unique */
export const NAMESPACE = 'segment'

export const config = {
  assumesPageview: true
}

/* initialize Segment script */
export const initialize = (config, context) => {
  const user = context('user')
  console.log('user in seg', user)
  if (!user || !user.userId) {
    console.log('No user id. Dont load segment')
    return false
  }
  // if (!config.trackingId) {
  //   throw new Error('No Setting id defined')
  // }
  /*eslint-disable */
  !function() {
    var analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize) {
      if (analytics.invoked) {
        window.console && console.error && console.error("Segment snippet included twice.");
      } else {
        analytics.invoked = !0;
        analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
        analytics.factory = function(t) {
          return function() {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(t);
            analytics.push(e);
            return analytics
          }
        };
        for (var t = 0; t < analytics.methods.length; t++) {
          var e = analytics.methods[t];
          analytics[e] = analytics.factory(e)
        }
        analytics.load = function(t, e) {
          var n = document.createElement("script");
          n.type = "text/javascript";
          n.async = !0;
          n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
          var a = document.getElementsByTagName("script")[0];
          a.parentNode.insertBefore(n, a);
          analytics._loadOptions = e
        };
        analytics.SNIPPET_VERSION = "4.1.0";
        console.log('load segment')
        // analytics.load("f3W8BZ0iCGrk1STIsMZV7JXfMGB7aMiW");
        if (config.assumesPageview) {
          // analytics.page();
        }
      }
    }
  }();
}

/* Trigger Segment page view */
export const page = (pageData, options, context) => {
  console.log('Segment Page Track', pageData)
  console.log('seg user', context())
  var x = context()
  x.integrations = false
}

/* Track Segment event */
export const track = (event, payload, options, context) => {
  console.log(`Segment Event > [${event}] [payload: ${JSON.stringify(payload, null, 2)}]`)
  console.log('helper', context('user'))
}

/* Identify Segment user */
export const identify = (id, traits, options, context) => {
  console.log('Segment identify', id, traits, opts)
  // return Promise.resolve()
}

export const loaded = function() {
  // return simulateSlowNess
  return !!window.SegmentLoaded
}

/* export the integration */
export default function SegmentIntegration(userConfig) {
  const mergedConfig = {
    // default config
    ...config,
    // user land config
    ...userConfig
  }
  return {
    NAMESPACE: NAMESPACE,
    config: mergedConfig,
    initialize: extend('initialize', initialize, mergedConfig),
    page: extend('page', page, mergedConfig),
    track: extend('track', track, mergedConfig),
    identify: extend('identify', identify, mergedConfig),
    loaded: extend('loaded', loaded, mergedConfig)
  }
}

// Allows for userland overrides of base functions
function extend(methodName, defaultFunction, config) {
  if (config[methodName] && typeof config[methodName] === 'function') {
    return config[methodName]
  }
  return defaultFunction
}
