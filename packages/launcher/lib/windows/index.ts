import execa from 'execa'
import fse from 'fs-extra'
import os from 'os'
import { join, normalize } from 'path'
import { tap, trim } from 'ramda'
import { get } from 'lodash'
import { notInstalledErr } from '../errors'
import { log } from '../log'
import { Browser, FoundBrowser } from '../types'

function formFullAppPath (name: string) {
  const exe = `C:/Program Files (x86)/Google/Chrome/Application/${chromeVersionNames[name]}/chrome.exe`

  return [normalize(exe)]
}

function formChromiumAppPath () {
  const exe = 'C:/Program Files (x86)/Google/chrome-win32/chrome.exe'

  return [normalize(exe)]
}

function formChromeCanaryAppPath () {
  const home = os.homedir()
  const exe = join(
    home,
    'AppData',
    'Local',
    'Google',
    'Chrome SxS',
    'Application',
    'chrome.exe'
  )

  return [normalize(exe)]
}

function formFirefoxAppPath (name: string) {
  const exe = `C:/Program Files (x86)/firefox ${firefoxVersionNames[name]}/firefox.exe`

  return [normalize(exe)]
}

function formFirefoxDeveloperEditionAppPath () {
  const exe = 'C:/Program Files (x86)/Firefox Developer Edition/firefox.exe'

  return [normalize(exe)]
}

function formFirefoxNightlyAppPath () {
  const exe = 'C:/Program Files (x86)/Firefox Nightly/firefox.exe'

  return [normalize(exe)]
}

function formEdgeCanaryAppPath () {
  const home = os.homedir()
  const exe = join(
    home,
    'AppData',
    'Local',
    'Microsoft',
    'Edge SxS',
    'Application',
    'msedge.exe'
  )

  return [normalize(exe)]
}

function formEdgeAppPath (name: string) {
  const exe = `C:/Program Files (x86)/Microsoft/Edge/Application/${edgeVersionNames[name]}/msedge.exe`

  return [normalize(exe)]
}

function formOperaAppPath (name: string) {
  const exe = `C:/Program Files/Opera/Opera ${operaVersionNames[name]}/opera.exe`

  return [normalize(exe)]
}

type NameToPath = (name: string) => string[]

type WindowsBrowserPaths = {
  [name: string]: {
    [channel: string]: NameToPath
  }
}

const formPaths: WindowsBrowserPaths = {
  chrome: {
    stable: formFullAppPath,
    canary: formChromeCanaryAppPath,
  },
  chromium: {
    stable: formChromiumAppPath,
  },
  firefox: {
    stable: formFirefoxAppPath,
    dev: formFirefoxDeveloperEditionAppPath,
    nightly: formFirefoxNightlyAppPath,
  },
  edge: {
    stable: formEdgeAppPath,
    beta: () => [normalize('C:/Program Files (x86)/Microsoft/Edge Beta/Application/msedge.exe')],
    dev: () => [normalize('C:/Program Files (x86)/Microsoft/Edge Dev/Application/msedge.exe')],
    canary: formEdgeCanaryAppPath,
  },
  opera: {
    stable: formOperaAppPath,
  },
}

let chrome_versions = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79]
let firefox_versions = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]
let opera_versions = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
let edge_versions = [79]

let chromeVersionNames = {}
let chromeBrowserPaths = {}
let chromeBrowserFullVersion = {
  66.0: '66.0.3359.117',
  67.0: '67.0.3396.62',
  68.0: '68.0.3440.70',
  69.0: '69.0.3497.81',
  70.0: '70.0.3538.67',
  71.0: '71.0.3578.80',
  72.0: '72.0.3626.81',
  73.0: '73.0.3683.75',
  74.0: '74.0.3729.108',
  75.0: '75.0.3770.80',
  76.0: '76.0.3809.87',
  77.0: '77.0.3865.75',
  78.0: '78.0.3904.70',
  79.0: '79.0.3945.36',
}

chrome_versions.forEach(function (version) {
  chromeVersionNames[`chrome${version}`] = chromeBrowserFullVersion[version]
  chromeBrowserPaths[`chrome${version}`] = formFullAppPath
})

let firefoxVersionNames = {}
let firefoxBrowserPaths = {}

firefox_versions.forEach(function (version) {
  firefoxVersionNames[`firefox${version}`] = `${version}.0`
  firefoxBrowserPaths[`firefox${version}`] = formFirefoxAppPath
})

let operaVersionNames = {}
let operaBrowserPaths = {}

opera_versions.forEach(function (version) {
  operaVersionNames[`opera${version}`] = `${version}.0`
  operaBrowserPaths[`opera${version}`] = formEdgeAppPath
})

let edgeVersionNames = {}
let edgeBrowserPaths = {}
let edgeBrowserFullVersion = {
  79.0: '79.0.309.71',
}

edge_versions.forEach(function (version) {
  edgeVersionNames[`edge${version}`] = edgeBrowserFullVersion[version]
  edgeBrowserPaths[`edge${version}`] = formEdgeCanaryAppPath
})

function getWindowsBrowser (browser: Browser): Promise<FoundBrowser> {
  const getVersion = (stdout: string): string => {
    // result from wmic datafile
    // "Version=61.0.3163.100"
    const wmicVersion = /^Version=(\S+)$/
    const m = wmicVersion.exec(stdout)

    if (m) {
      return m[1]
    }

    log('Could not extract version from %s using regex %s', stdout, wmicVersion)
    throw notInstalledErr(browser.name)
  }

  const formFullAppPathFn: NameToPath = get(formPaths, [browser.name, browser.channel], formFullAppPath)

  const exePaths = formFullAppPathFn(browser.name)

  log('looking at possible paths... %o', { browser, exePaths })

  // shift and try paths 1-by-1 until we find one that works
  const tryNextExePath = async () => {
    const exePath = exePaths.shift()

    if (!exePath) {
      // exhausted available paths
      throw notInstalledErr(browser.name)
    }

    return fse.pathExists(exePath)
    .then((exists) => {
      log('found %s ?', exePath, exists)

      if (!exists) {
        return tryNextExePath()
      }

      return getVersionString(exePath)
      .then(tap(log))
      .then(getVersion)
      .then((version: string) => {
        log('browser %s at \'%s\' version %s', browser.name, exePath, version)

        return {
          name: browser.name,
          version,
          path: exePath,
        } as FoundBrowser
      })
    })
    .catch((err) => {
      log('error while looking up exe, trying next exePath %o', { exePath, exePaths, err })

      return tryNextExePath()
    })
  }

  return tryNextExePath()
}

export function getVersionString (path: string) {
  const doubleEscape = (s: string) => {
    return s.replace(/\\/g, '\\\\')
  }

  // on Windows using "--version" seems to always start the full
  // browser, no matter what one does.

  const args = [
    'datafile',
    'where',
    `name="${doubleEscape(path)}"`,
    'get',
    'Version',
    '/value',
  ]

  return execa.stdout('wmic', args)
  .then(trim)
}

export function detect (browser: Browser) {
  return getWindowsBrowser(browser)
}
