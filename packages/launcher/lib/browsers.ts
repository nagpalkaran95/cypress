import { log } from './log'
import * as cp from 'child_process'
import { Browser, FoundBrowser } from './types'

const firefoxInfo = 'Firefox support is currently in beta! You can help us continue to improve the Cypress + Firefox experience by [reporting any issues you find](https://on.cypress.io/new-issue).'

let chrome_versions = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]
let firefox_versions = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
let opera_versions = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
let edge_versions = [79]

let chromeBrowsers: Browser[] = []
let firefoxBrowsers: Browser[] = []
let operaBrowsers: Browser[] = []
let edgeBrowsers: Browser[] = []

for (let chromeVer of chrome_versions) {
  chromeBrowsers.push({
    name: `chrome${chromeVer}`,
    family: 'chromium',
    channel: 'stable',
    displayName: 'Chrome',
    versionRegex: /Google Chrome (\S+)/,
    profile: true,
    binary: ['google-chrome', 'chrome', 'google-chrome-stable'],
  })
}

for (let firefoxVer of firefox_versions) {
  firefoxBrowsers.push({
    name: `firefox${firefoxVer}`,
    family: 'firefox',
    channel: 'stable',
    displayName: 'Firefox',
    info: firefoxInfo,
    // Mozilla Firefox 70.0.1
    versionRegex: /^Mozilla Firefox ([^\sab]+)$/,
    profile: true,
    binary: 'firefox',
  })
}

for (let operaVer of opera_versions) {
  operaBrowsers.push({
    name: `opera${operaVer}`,
    family: 'chromium',
    channel: 'stable',
    displayName: 'Opera',
    versionRegex: /Opera (\S+)/,
    profile: true,
    binary: 'opera',
  })
}

for (let edgeVer of edge_versions) {
  edgeBrowsers.push({
    name: `edge${edgeVer}`,
    family: 'chromium',
    channel: 'stable',
    displayName: 'Edge Canary',
    versionRegex: /Microsoft Edge (\S+)/,
    profile: true,
    binary: 'edge-canary',
  })
}

/** list of the browsers we can detect and use by default */
let otherBrowsers: Browser[] = [
  {
    name: 'chromium',
    family: 'chromium',
    // technically Chromium is always in development
    channel: 'stable',
    displayName: 'Chromium',
    versionRegex: /Chromium (\S+)/,
    profile: true,
    binary: ['chromium-browser', 'chromium'],
  },
  {
    name: 'chrome',
    family: 'chromium',
    channel: 'canary',
    displayName: 'Canary',
    versionRegex: /Google Chrome Canary (\S+)/,
    profile: true,
    binary: 'google-chrome-canary',
  },
  {
    name: 'firefox',
    family: 'firefox',
    channel: 'dev',
    displayName: 'Firefox Developer Edition',
    info: firefoxInfo,
    // Mozilla Firefox 73.0b12
    versionRegex: /^Mozilla Firefox (\S+b\S*)$/,
    profile: true,
    // ubuntu PPAs install it as firefox
    binary: ['firefox-developer-edition', 'firefox'],
  },
  {
    name: 'firefox',
    family: 'firefox',
    channel: 'nightly',
    displayName: 'Firefox Nightly',
    info: firefoxInfo,
    // Mozilla Firefox 74.0a1
    versionRegex: /^Mozilla Firefox (\S+a\S*)$/,
    profile: true,
    // ubuntu PPAs install it as firefox-trunk
    binary: ['firefox-nightly', 'firefox-trunk'],
  },
  {
    name: 'edge',
    family: 'chromium',
    channel: 'canary',
    displayName: 'Edge Canary',
    versionRegex: /Microsoft Edge Canary (\S+)/,
    profile: true,
    binary: 'edge-canary',
  },
  {
    name: 'edge',
    family: 'chromium',
    channel: 'beta',
    displayName: 'Edge Beta',
    versionRegex: /Microsoft Edge Beta (\S+)/,
    profile: true,
    binary: 'edge-beta',
  },
  {
    name: 'edge',
    family: 'chromium',
    channel: 'dev',
    displayName: 'Edge Dev',
    versionRegex: /Microsoft Edge Dev (\S+)/,
    profile: true,
    binary: 'edge-dev',
  },
]

export const browsers = otherBrowsers.concat(chromeBrowsers, firefoxBrowsers, operaBrowsers, edgeBrowsers)

/** starts a found browser and opens URL if given one */
export function launch (
  browser: FoundBrowser,
  url: string,
  args: string[] = []
) {
  log('launching browser %o to open %s', browser, url)

  if (!browser.path) {
    throw new Error(`Browser ${browser.name} is missing path`)
  }

  if (url) {
    args = [url].concat(args)
  }

  log('spawning browser %o with args %s', browser, args.join(' '))

  return cp.spawn(browser.path, args, { stdio: 'ignore' })
}
