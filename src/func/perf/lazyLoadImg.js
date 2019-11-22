/**
 * lazy load images
 * 
 * html:
 *  <img src="placeholder.gif" data-src="real-url.jpg" class="lazy-img" />
 * 
 * js:
 * new LazyLoadImg({
 *  selector: '.lazy-img'
 * })
 */

import { debounce } from './index'

export class LazyLoadImg {
  static options = {
    selector: '', // css 选择器 | dom
  }

  constructor (options = {}) {
    this.$options = Object.assign({}, LazyLoadImg.options, options)
    this.handleScroll = debounce(this.load).bind(this)
    this.$imgs = null

    this.init()
  }

  init () {
    this.domReady()
  }

  domReady () {
    this.addEventListener(document, 'DOMContentLoaded', () => {
      this.$imgs = this.getImgs()
      if (!this.$imgs.length) return

      this.addEvents()
      this.load()
    })
  }

  getImgs () {
    const selector = this.$options.selector
    let dom = []

    if (typeof selector === 'string') {
      dom = document.querySelectorAll(selector))
    }

    if (selector.nodeType === 1) {
      dom = [selector]
    }

    if (selector instanceof NodeList) {
      dom = selector
    }

    return Array.from(dom)
  }

  load () {
    const $imgs = this.$imgs

    if (!$imgs.length) {
      this.removeEvents()
    }

    $imgs.forEach(img => {
      const rect = img.getBoundingClientRect()
      const height = window.innerHeight || document.documentElement.clientHeight
      const isInViewport = rect.top <= height && rect.bottom >= 0 ? true : false
      const isVisible = getComputedStyle(img)['display'] !== 'none'

      if (isInViewport && isVisible) {
        img.src = img.dataset.src
      }
    })

    this.$imgs = $imgs.filter(v => v.getAttribute('src') !== v.dataset.src)
  }

  addEvents () {
    this.addEventListener(document, 'scroll', this.handleScroll)
    this.addEventListener(document, 'resize', this.handleScroll)
    this.addEventListener(document, 'orientationchange', this.handleScroll)
  }

  removeEvents () {
    this.removeEventListener(document, 'scroll', this.handleScroll)
    this.removeEventListener(document, 'resize', this.handleScroll)
    this.removeEventListener(document, 'orientationchange', this.handleScroll)
  }

  addEventListener (el, event, handler) {
    el.addEventListener(event, handler, false)
  }

  removeEventListener (el, event, handler) {
    el.removeEventListener(event, handler, false)
  }

  teardown () {
    this.removeEvents()
  }
}
