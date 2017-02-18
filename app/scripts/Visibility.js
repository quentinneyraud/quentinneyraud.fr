export default class Visibility {
  isSupported () {
    this.getSUpport()
    return typeof document.hidden !== 'undefined' || typeof document.msHidden !== 'undefined' || typeof document.webkitHidden !== 'undefined'
  }

  getSUpport () {
    if (typeof document.hidden !== 'undefined') {
      return {
        hidden: 'hidden',
        visibilityChange: 'visibilitychange'
      }
    } else if (typeof document.msHidden !== 'undefined') {
      return {
        hidden: 'msHidden',
        visibilityChange: 'msvisibilitychange'
      }
    } else if (typeof document.webkitHidden !== 'undefined') {
      return {
        hidden: 'webkitHidden',
        visibilityChange: 'webkitvisibilitychange'
      }
    }
  }

  listen (cb) {
    const { hidden, visibilityChange } = this.getSUpport()
    document.addEventListener(visibilityChange, () => {
      cb(document[hidden])
    }, false)
  }
}
