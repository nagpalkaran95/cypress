import { findApp } from './util'
import { FoundBrowser, Browser } from '../types'
import * as linuxHelper from '../linux'
import { log } from '../log'
import { merge, partial } from 'ramda'
import { get } from 'lodash'

const detectChrome66 = partial(findApp, ['GoogleChrome66.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome67 = partial(findApp, ['GoogleChrome67.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome68 = partial(findApp, ['GoogleChrome68.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome69 = partial(findApp, ['GoogleChrome69.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome70 = partial(findApp, ['GoogleChrome70.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome71 = partial(findApp, ['GoogleChrome71.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome72 = partial(findApp, ['GoogleChrome72.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome73 = partial(findApp, ['GoogleChrome73.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome74 = partial(findApp, ['GoogleChrome74.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome75 = partial(findApp, ['GoogleChrome75.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome76 = partial(findApp, ['GoogleChrome76.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome77 = partial(findApp, ['GoogleChrome77.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome78 = partial(findApp, ['GoogleChrome78.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])
const detectChrome79 = partial(findApp, ['GoogleChrome79.app', 'Contents/MacOS/Google Chrome', 'com.google.Chrome', 'KSVersion'])

const detectFirefox60 = partial(findApp, ['firefox 60.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox61 = partial(findApp, ['firefox 61.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox62 = partial(findApp, ['firefox 62.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox63 = partial(findApp, ['firefox 63.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox64 = partial(findApp, ['firefox 64.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox65 = partial(findApp, ['firefox 65.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox66 = partial(findApp, ['firefox 66.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox67 = partial(findApp, ['firefox 67.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox68 = partial(findApp, ['firefox 68.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox69 = partial(findApp, ['firefox 69.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox70 = partial(findApp, ['firefox 70.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox71 = partial(findApp, ['firefox 71.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])
const detectFirefox72 = partial(findApp, ['firefox 72.0.app', 'Contents/MacOS/firefox-bin', 'org.mozilla.firefox', 'CFBundleShortVersionString'])

const detectOpera50 = partial(findApp, ['Opera 50.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera51 = partial(findApp, ['Opera 51.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera52 = partial(findApp, ['Opera 52.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera53 = partial(findApp, ['Opera 53.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera54 = partial(findApp, ['Opera 54.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera55 = partial(findApp, ['Opera 55.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera56 = partial(findApp, ['Opera 56.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera57 = partial(findApp, ['Opera 57.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera58 = partial(findApp, ['Opera 58.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera59 = partial(findApp, ['Opera 59.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera60 = partial(findApp, ['Opera 60.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera61 = partial(findApp, ['Opera 61.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera62 = partial(findApp, ['Opera 62.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera63 = partial(findApp, ['Opera 63.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])
const detectOpera64 = partial(findApp, ['Opera 64.0.app', 'Contents/MacOS/Opera', 'com.operasoftware.Opera', 'CFBundleShortVersionString'])

const detectCanary = partial(findApp, [
  'Google Chrome Canary.app',
  'Contents/MacOS/Google Chrome Canary',
  'com.google.Chrome.canary',
  'KSVersion',
])
const detectChrome = partial(findApp, [
  'Google Chrome.app',
  'Contents/MacOS/Google Chrome',
  'com.google.Chrome',
  'KSVersion',
])
const detectChromium = partial(findApp, [
  'Chromium.app',
  'Contents/MacOS/Chromium',
  'org.chromium.Chromium',
  'CFBundleShortVersionString',
])
const detectFirefox = partial(findApp, [
  'Firefox.app',
  'Contents/MacOS/firefox-bin',
  'org.mozilla.firefox',
  'CFBundleShortVersionString',
])
const detectFirefoxDeveloperEdition = partial(findApp, [
  'Firefox Developer Edition.app',
  'Contents/MacOS/firefox-bin',
  'org.mozilla.firefoxdeveloperedition',
  'CFBundleShortVersionString',
])
const detectFirefoxNightly = partial(findApp, [
  'Firefox Nightly.app',
  'Contents/MacOS/firefox-bin',
  'org.mozilla.nightly',
  'CFBundleShortVersionString',
])
const detectEdgeCanary = partial(findApp, [
  'Microsoft Edge Canary.app',
  'Contents/MacOS/Microsoft Edge Canary',
  'com.microsoft.Edge.Canary',
  'CFBundleShortVersionString',
])
const detectEdgeBeta = partial(findApp, [
  'Microsoft Edge Beta.app',
  'Contents/MacOS/Microsoft Edge Beta',
  'com.microsoft.Edge.Beta',
  'CFBundleShortVersionString',
])
const detectEdgeDev = partial(findApp, [
  'Microsoft Edge Dev.app',
  'Contents/MacOS/Microsoft Edge Dev',
  'com.microsoft.Edge.Dev',
  'CFBundleShortVersionString',
])
const detectEdge = partial(findApp, [
  'Microsoft Edge.app',
  'Contents/MacOS/Microsoft Edge',
  'com.microsoft.Edge',
  'CFBundleShortVersionString',
])

type Detectors = {
  [name: string]: {
    [channel: string]: Function
  }
}

const browsers: Detectors = {
  chrome: {
    stable: detectChrome, detectChrome66, detectChrome67, detectChrome68, detectChrome69, detectChrome70, detectChrome71, detectChrome72, detectChrome73, detectChrome74, detectChrome75, detectChrome76, detectChrome77, detectChrome78, detectChrome79,
    canary: detectCanary,
  },
  chromium: {
    stable: detectChromium,
  },
  firefox: {
    stable: detectFirefox, detectFirefox60, detectFirefox61, detectFirefox62, detectFirefox63, detectFirefox64, detectFirefox65, detectFirefox66, detectFirefox67, detectFirefox68, detectFirefox69, detectFirefox70, detectFirefox71, detectFirefox72,
    dev: detectFirefoxDeveloperEdition,
    nightly: detectFirefoxNightly,
  },
  edge: {
    stable: detectEdge,
    canary: detectEdgeCanary,
    beta: detectEdgeBeta,
    dev: detectEdgeDev,
  },
  opera: {
    stable: detectOpera50, detectOpera51, detectOpera52, detectOpera53, detectOpera54, detectOpera55, detectOpera56, detectOpera57, detectOpera58, detectOpera59, detectOpera60, detectOpera61, detectOpera62, detectOpera63, detectOpera64,
  },
}

export function getVersionString (path: string) {
  return linuxHelper.getVersionString(path)
}

export function detect (browser: Browser): Promise<FoundBrowser> {
  let fn = get(browsers, [browser.name, browser.channel])

  if (!fn) {
    // ok, maybe it is custom alias?
    log('detecting custom browser %s on darwin', browser.name)

    return linuxHelper.detect(browser)
  }

  return fn()
  .then(merge({ name: browser.name }))
  .catch(() => {
    log('could not detect %s using traditional Mac methods', browser.name)
    log('trying linux search')

    return linuxHelper.detect(browser)
  })
}
