import { findApp } from './util'
import { FoundBrowser, Browser } from '../types'
import * as linuxHelper from '../linux'
import { log } from '../log'
import { merge, partial } from 'ramda'

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

const detectCanary = partial(findApp, [
  'Google Chrome Canary.app',
  'Contents/MacOS/Google Chrome Canary',
  'com.google.Chrome.canary',
  'KSVersion',
])
const detectChromium = partial(findApp, [
  'Chromium.app',
  'Contents/DMacOS/Chromium',
  'org.chromium.Chromium',
  'CFBundleShortVersionString',
])
const detectEdgeCanary = partial(findApp, [
  'Microsoft Edge Canary.app',
  'Contents/MacOS/Microsoft Edge Canary',
  'com.microsoft.Edge.Canary',
  'CFBundleShortVersionString',
])
const detectEdgeDev = partial(findApp, [
  'Microsoft Edge Dev.app',
  'Contents/MacOS/Microsoft Edge Dev',
  'com.microsoft.Edge.Dev',
  'CFBundleShortVersionString',
])
const detectOpera = partial(findApp, [
  'Opera.app',
  'Contents/MacOS/Opera',
  'com.operasoftware.Opera',
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

type Detectors = {
  [index: string]: Function
}

const browsers: Detectors = {
  chrome66: detectChrome66,
  chrome67: detectChrome67,
  chrome68: detectChrome68,
  chrome69: detectChrome69,
  chrome70: detectChrome70,
  chrome71: detectChrome71,
  chrome72: detectChrome72,
  chrome73: detectChrome73,
  chrome74: detectChrome74,
  chrome75: detectChrome75,
  chrome76: detectChrome76,
  chrome77: detectChrome77,
  chrome78: detectChrome78,
  firefox60: detectFirefox60,
  firefox61: detectFirefox61,
  firefox62: detectFirefox62,
  firefox63: detectFirefox63,
  firefox64: detectFirefox64,
  firefox65: detectFirefox65,
  firefox66: detectFirefox66,
  firefox67: detectFirefox67,
  firefox68: detectFirefox68,
  firefox69: detectFirefox69,
  firefox70: detectFirefox70,
  canary: detectCanary,
  chromium: detectChromium,
  edgeDev: detectEdgeDev,
  edgeCanary: detectEdgeCanary,
  opera: detectOpera,
  firefoxDeveloperEdition: detectFirefoxDeveloperEdition,
  firefoxNightly: detectFirefoxNightly,
}

export function getVersionString (path: string) {
  return linuxHelper.getVersionString(path)
}

export function detect (browser: Browser): Promise<FoundBrowser> {
  let fn = browsers[browser.name]

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
