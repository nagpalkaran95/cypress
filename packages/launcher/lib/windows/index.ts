import execa from 'execa'
import { pathExists } from 'fs-extra'
import { homedir } from 'os'
import { join, normalize } from 'path'
import { tap, trim } from 'ramda'
import { notInstalledErr } from '../errors'
import { log } from '../log'
import { Browser, FoundBrowser } from '../types'

function formFullAppPath (name: string) {
  const prefix = 'C:/Program Files (x86)/Google/Chrome/Application'

  return normalize(join(prefix, `${name}.exe`))
}

function formChromiumAppPath () {
  const exe = 'C:/Program Files (x86)/Google/chrome-win32/chrome.exe'

  return normalize(exe)
}

function formChromeCanaryAppPath () {
  const home = homedir()
  const exe = join(
    home,
    'AppData',
    'Local',
    'Google',
    'Chrome SxS',
    'Application',
    'chrome.exe'
  )

  return normalize(exe)
}

function formEdgeCanaryAppPath () {
  const home = homedir()
  const exe = join(
    home,
    'AppData',
    'Local',
    'Microsoft',
    'Edge SxS',
    'Application',
    'msedge.exe'
  )

  return normalize(exe)
}

function formOperaAppPath (name: string) {
  const exe = `C:/Program Files/Opera/Opera ${operaVersionNames[name]}/opera.exe`

  return normalize(exe)
}

function formChromeAppPath (name: string) {
  const exe = `C:/Program Files (x86)/Google/Chrome/Application/${chromeVersionNames[name]}/chrome.exe`

  return normalize(exe)
}

function formFirefoxAppPath (name: string) {
  const exe = `C:/Program Files (x86)/firefox ${firefoxVersionNames[name]}/firefox.exe`

  return normalize(exe)
}

function formEdgeDevAppPath () {
  const exe = 'C:/Program Files (x86)/Microsoft/Edge Dev/Application/msedge.exe'

  return normalize(exe)
}

function formFirefoxDeveloperEditionAppPath () {
  const exe = 'C:/Program Files (x86)/Firefox Developer Edition/firefox.exe'

  return normalize(exe)
}

function formFirefoxNightlyAppPath () {
  const exe = 'C:/Program Files (x86)/Firefox Nightly/firefox.exe'

  return normalize(exe)
}

function formIEAppPath () {
  const exe = 'C:/Program Files (x86)/Internet Explorer/iexplore.exe'

  return normalize(exe)
}

let chrome_versions = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
let firefox_versions = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70]
let opera_versions = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64]

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
}

chrome_versions.forEach(function (version) {
  chromeVersionNames[`chrome${version}`] = chromeBrowserFullVersion[version]
  chromeBrowserPaths[`chrome${version}`] = formChromeAppPath
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
  operaBrowserPaths[`opera${version}`] = formOperaAppPath
})

let otherBrowserPaths = {
  chrome: formFullAppPath,
  canary: formChromeCanaryAppPath,
  chromium: formChromiumAppPath,
  edgeDev: formEdgeDevAppPath,
  edgeCanary: formEdgeCanaryAppPath,
  firefoxDeveloperEdition: formFirefoxDeveloperEditionAppPath,
  firefoxNightly: formFirefoxNightlyAppPath,
  ie: formIEAppPath,
}

type NameToPath = (name: string) => string

interface WindowsBrowserPaths {
  [index: string]: NameToPath
}

const formPaths: WindowsBrowserPaths = Object.assign(chromeBrowserPaths, firefoxBrowserPaths, operaBrowserPaths, otherBrowserPaths)

function getWindowsBrowser (name: string): Promise<FoundBrowser> {
  const getVersion = (stdout: string): string => {
    // result from wmic datafile
    // "Version=61.0.3163.100"
    const wmicVersion = /^Version=(\S+)$/
    const m = wmicVersion.exec(stdout)

    if (m) {
      return m[1]
    }

    log('Could not extract version from %s using regex %s', stdout, wmicVersion)
    throw notInstalledErr(name)
  }

  const formFullAppPathFn: any = formPaths[name] || formFullAppPath
  const exePath = formFullAppPathFn(name)

  log('exe path %s', exePath)

  return pathExists(exePath)
  .then((exists) => {
    log('found %s ?', exePath, exists)

    if (!exists) {
      throw notInstalledErr(`Browser ${name} file not found at ${exePath}`)
    }

    return getVersionString(exePath)
    .then(tap(log))
    .then(getVersion)
    .then((version: string) => {
      log('browser %s at \'%s\' version %s', name, exePath, version)

      return {
        name,
        version,
        path: exePath,
      } as FoundBrowser
    })
  })
  .catch(() => {
    throw notInstalledErr(name)
  })
}

export function getVersionString (path: string) {
  const doubleEscape = (s: string) => s.replace(/\\/g, '\\\\')

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

  return execa('wmic', args)
  .then((result) => result.stdout)
  .then(trim)
}

export function detect (browser: Browser) {
  return getWindowsBrowser(browser.name)
}
