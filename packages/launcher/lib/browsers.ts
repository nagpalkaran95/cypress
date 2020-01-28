import { log } from './log'
import * as cp from 'child_process'
import { Browser, FoundBrowser } from './types'

/** list of the browsers we can detect and use by default */

let chrome_versions = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
let firefox_versions = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
let opera_versions = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
let edge_versions = [79]

let chromeBrowsers: Browser[] = []
let firefoxBrowsers: Browser[] = []
let operaBrowsers: Browser[] = []
let edgeBrowsers: Browser[] = []

for (let chromeVer of chrome_versions) {
  chromeBrowsers.push({
    name: `chrome${chromeVer}`,
    family: 'chrome',
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
    displayName: 'Firefox',
    versionRegex: /Firefox (\S+)/,
    profile: true,
    binary: 'firefox',
  })
}

for (let operaVer of opera_versions) {
  operaBrowsers.push({
    name: `opera${operaVer}`,
    family: 'chrome',
    displayName: 'Opera',
    versionRegex: /Opera (\S+)/,
    profile: true,
    binary: 'opera',
  })
}

for (let edgeVer of edge_versions) {
  edgeBrowsers.push({
    name: `edge${edgeVer}`,
    family: 'chrome',
    displayName: 'Edge Canary',
    versionRegex: /Microsoft Edge (\S+)/,
    profile: true,
    binary: 'edge-canary',
  })
}

let otherBrowsers: Browser[] = [
  {
    name: 'chromium',
    family: 'chrome',
    displayName: 'Chromium',
    versionRegex: /Chromium (\S+)/,
    profile: true,
    binary: ['chromium-browser', 'chromium'],
  },
  {
    name: 'canary',
    family: 'chrome',
    displayName: 'Canary',
    versionRegex: /Google Chrome Canary (\S+)/,
    profile: true,
    binary: 'google-chrome-canary',
  },
  {
    name: 'edgeDev',
    family: 'chrome',
    displayName: 'Edge Dev',
    versionRegex: /Microsoft Edge Dev (\S+)/,
    profile: true,
    binary: 'edge-dev',
  },
  {
    name: 'firefoxDeveloperEdition',
    family: 'firefox',
    displayName: 'Firefox Developer Edition',
    versionRegex: /Firefox Developer Edition (\S+)/,
    profile: true,
    binary: 'firefox-developer-edition',
  },
  {
    name: 'firefoxNightly',
    family: 'firefox',
    displayName: 'Firefox Nightly',
    versionRegex: /Firefox Nightly (\S+)/,
    profile: true,
    binary: 'firefox-nightly',
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
