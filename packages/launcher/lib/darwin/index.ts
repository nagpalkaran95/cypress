import { findApp } from './util'
import { FoundBrowser, Browser } from '../types'
import * as linuxHelper from '../linux'
import { log } from '../log'
import { merge, partial } from 'ramda'

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

type Detectors = {
  [index: string]: Function
}

const browsers: Detectors = {
  chrome: detectChrome,
  canary: detectCanary,
  chromium: detectChromium,
  edgeDev: detectEdgeDev,
  edgeCanary: detectEdgeCanary,
  opera: detectOpera,
  firefox: detectFirefox,
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
