import domReady from 'domready'
import WebFont from 'webfontloader'
import BarbaWrapper from './BarbaWrapper'
import HomePage from './pages/HomePage'

const DOM_READY_EVENT = 'dom-ready'
const FONTS_READY_EVENT = 'fonts-ready'
const dbg = debug('app:App')

export default class App {
  constructor () {
    dbg('Init App')
    this.events = []
    this.waitDomReady()
    this.waitFontsReady() // comment if you don't load fonts with webfontloader
  }

  /**
   * Instanciate BarbaWrapper
   */
  start () {
    dbg('start')

    new BarbaWrapper({
      cache: false,
      prefetch: true,
      navId: null,
      refreshOnSameHrefClick: false
    })
      .match('HomePage', new HomePage())
      .start()
  }

  /**
   * Wait for DOM ready before call start()
   */
  waitDomReady () {
    this.events.push(DOM_READY_EVENT)
    domReady(() => {
      dbg('DOM ready')
      this.onLoadEventSuccess(DOM_READY_EVENT)
    })
  }

  /**
   * Wait for fonts ready before call start()
   * see: https://github.com/typekit/webfontloader
   */
  waitFontsReady () {
    this.events.push(FONTS_READY_EVENT)
    WebFont.load({
      google: {
        families: ['Montserrat:400,700', 'Crimson Text:400i'],
        text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?!.,>%éèà1234567890'
      },
      classes: false,
      active: () => {
        dbg('fonts ready')
        this.onLoadEventSuccess(FONTS_READY_EVENT)
      }
    })
  }

  /**
   * Check wainting events
   *
   * @param key
   */
  onLoadEventSuccess (key) {
    this.events.splice(this.events.indexOf(key), 1)
    if (this.events.length === 0) {
      this.start()
    }
  }
}
