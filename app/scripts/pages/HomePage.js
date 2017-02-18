import Page from './Page'
import Visibility from '../Visibility'

const dbg = debug('app:HomePage')

export default class HomePage extends Page {
  constructor () {
    super()
    dbg('Init HomePage')
  }

  initializeElements () {
    super.initializeElements()
  }

  onEnter () {
    super.onEnter()
    const initialTitle = document.title

    document.title = '😀 ' + initialTitle

    const visibility = new Visibility()
    if (visibility.isSupported()) {
      visibility.listen((hidden) => {
        TweenMax.killTweensOf(this)
        if (hidden) {
          document.title = '😩 ' + initialTitle
        } else {
          document.title = '😀 ' + initialTitle
        }
      })
    }
  }
}
