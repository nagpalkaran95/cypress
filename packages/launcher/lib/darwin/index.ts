import { findApp, FindAppParams } from './util'
import { Browser, DetectedBrowser } from '../types'
import * as linuxHelper from '../linux'
import { log } from '../log'
import { merge } from 'ramda'
import { get } from 'lodash'

type Detectors = {
  [name: string]: {
    [channel: string]: FindAppParams
  }
}

export const browsers: Detectors = {
  chrome: {
    stable: {
      appName: 'Google Chrome.app',
      executable: 'Contents/MacOS/Google Chrome',
      appId: 'com.google.Chrome',
      versionProperty: 'KSVersion',
    },
    canary: {
      appName: 'Google Chrome Canary.app',
      executable: 'Contents/MacOS/Google Chrome Canary',
      appId: 'com.google.Chrome.canary',
      versionProperty: 'KSVersion',
    },
  },
  chromium: {
    stable: {
      appName: 'Chromium.app',
      executable: 'Contents/MacOS/Chromium',
      appId: 'org.chromium.Chromium',
      versionProperty: 'CFBundleShortVersionString',
    },
  },
  firefox: {
    stable: {
      appName: 'Firefox.app',
      executable: 'Contents/MacOS/firefox-bin',
      appId: 'org.mozilla.firefox',
      versionProperty: 'CFBundleShortVersionString',
    },
    dev: {
      appName: 'Firefox Developer Edition.app',
      executable: 'Contents/MacOS/firefox-bin',
      appId: 'org.mozilla.firefoxdeveloperedition',
      versionProperty: 'CFBundleShortVersionString',
    },
    nightly: {
      appName: 'Firefox Nightly.app',
      executable: 'Contents/MacOS/firefox-bin',
      appId: 'org.mozilla.nightly',
      versionProperty: 'CFBundleShortVersionString',
    },
  },
  edge: {
    stable: {
      appName: 'Microsoft Edge.app',
      executable: 'Contents/MacOS/Microsoft Edge',
      appId: 'com.microsoft.Edge',
      versionProperty: 'CFBundleShortVersionString',
    },
    canary: {
      appName: 'Microsoft Edge Canary.app',
      executable: 'Contents/MacOS/Microsoft Edge Canary',
      appId: 'com.microsoft.Edge.Canary',
      versionProperty: 'CFBundleShortVersionString',
    },
    beta: {
      appName: 'Microsoft Edge Beta.app',
      executable: 'Contents/MacOS/Microsoft Edge Beta',
      appId: 'com.microsoft.Edge.Beta',
      versionProperty: 'CFBundleShortVersionString',
    },
    dev: {
      appName: 'Microsoft Edge Dev.app',
      executable: 'Contents/MacOS/Microsoft Edge Dev',
      appId: 'com.microsoft.Edge.Dev',
      versionProperty: 'CFBundleShortVersionString',
    },
  },
  chrome66: { stable: { appName: 'GoogleChrome66.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome67: { stable: { appName: 'GoogleChrome67.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome68: { stable: { appName: 'GoogleChrome68.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome69: { stable: { appName: 'GoogleChrome69.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome70: { stable: { appName: 'GoogleChrome70.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome71: { stable: { appName: 'GoogleChrome71.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome72: { stable: { appName: 'GoogleChrome72.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome73: { stable: { appName: 'GoogleChrome73.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome74: { stable: { appName: 'GoogleChrome74.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome75: { stable: { appName: 'GoogleChrome75.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome76: { stable: { appName: 'GoogleChrome76.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome77: { stable: { appName: 'GoogleChrome77.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome78: { stable: { appName: 'GoogleChrome78.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome79: { stable: { appName: 'GoogleChrome79.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  chrome80: { stable: { appName: 'GoogleChrome80.app', executable: 'Contents/MacOS/Google Chrome', appId: 'com.google.Chrome', versionProperty: 'KSVersion' } },
  firefox60: { stable: { appName: 'firefox 60.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox61: { stable: { appName: 'firefox 61.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox62: { stable: { appName: 'firefox 62.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox63: { stable: { appName: 'firefox 63.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox64: { stable: { appName: 'firefox 64.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox65: { stable: { appName: 'firefox 65.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox66: { stable: { appName: 'firefox 66.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox67: { stable: { appName: 'firefox 67.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox68: { stable: { appName: 'firefox 68.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox69: { stable: { appName: 'firefox 69.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox70: { stable: { appName: 'firefox 70.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox71: { stable: { appName: 'firefox 71.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox72: { stable: { appName: 'firefox 72.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  firefox73: { stable: { appName: 'firefox 73.0.app', executable: 'Contents/MacOS/firefox-bin', appId: 'org.mozilla.firefox', versionProperty: 'CFBundleShortVersionString' } },
  opera50: { stable: { appName: 'Opera 50.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera51: { stable: { appName: 'Opera 51.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera52: { stable: { appName: 'Opera 52.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera53: { stable: { appName: 'Opera 53.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera54: { stable: { appName: 'Opera 54.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera55: { stable: { appName: 'Opera 55.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera56: { stable: { appName: 'Opera 56.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera57: { stable: { appName: 'Opera 57.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera58: { stable: { appName: 'Opera 58.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera59: { stable: { appName: 'Opera 59.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera60: { stable: { appName: 'Opera 60.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera61: { stable: { appName: 'Opera 61.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera62: { stable: { appName: 'Opera 62.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera63: { stable: { appName: 'Opera 63.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  opera64: { stable: { appName: 'Opera 64.0.app', executable: 'Contents/MacOS/Opera', appId: 'com.operasoftware.Opera', versionProperty: 'CFBundleShortVersionString' } },
  edge79: { stable: { appName: 'Edge79.app', executable: 'Contents/MacOS/Microsoft Edge', appId: 'com.microsoft.Edge', versionProperty: 'CFBundleShortVersionString' } },
  edge80: { stable: { appName: 'Edge80.app', executable: 'Contents/MacOS/Microsoft Edge', appId: 'com.microsoft.Edge', versionProperty: 'CFBundleShortVersionString' } },
  edge79beta: { stable: { appName: 'Edgebeta79.app', executable: 'Contents/MacOS/Microsoft Edge Beta', appId: 'com.microsoft.Edge', versionProperty: 'CFBundleShortVersionString' } },
  edge80beta: { stable: { appName: 'Edgebeta80.app', executable: 'Contents/MacOS/Microsoft Edge Beta', appId: 'com.microsoft.Edge', versionProperty: 'CFBundleShortVersionString' } },
  edge81dev: { stable: { appName: 'Edgedev81.app', executable: 'Contents/MacOS/Microsoft Edge Dev', appId: 'com.microsoft.Edge', versionProperty: 'CFBundleShortVersionString' } },
}

export const getVersionString = linuxHelper.getVersionString

export function detect (browser: Browser): Promise<DetectedBrowser> {
  let findAppParams = get(browsers, [browser.name, browser.channel])

  if (!findAppParams) {
    // ok, maybe it is custom alias?
    log('detecting custom browser %s on darwin', browser.name)

    return linuxHelper.detect(browser)
  }

  return findApp(findAppParams)
  .then(merge({ name: browser.name }))
  .catch(() => {
    log('could not detect %s using traditional Mac methods', browser.name)
    log('trying linux search')

    return linuxHelper.detect(browser)
  })
}
