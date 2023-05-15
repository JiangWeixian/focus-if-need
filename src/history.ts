import type { Hookable } from 'hookable'
import type { FocusIfNeedHookMap } from './types'

interface FocusHistoryOptions {
  hooks?: Hookable<FocusIfNeedHookMap, string>
}

export class FocusHistory {
  /**
   * @description Only focus via `focus(id)` will push into stacks
   */
  stacks: string[]
  hooks: FocusHistoryOptions['hooks']
  /**
   * @description Current index in stacks
   */
  index: number
  constructor(options: FocusHistoryOptions) {
    this.stacks = []
    this.hooks = options.hooks
    this.index = 0
  }

  static create(options: FocusHistoryOptions) {
    return new FocusHistory(options)
  }

  /**
   * @description Record focused element, which is recored by call `history.focus(id)` or `focusIfNeed.focus(id, element)`
   */
  push(id: string) {
    // If lastest focused element equal current element, Skip it
    if (this.stacks[this.stacks.length - 1] !== id) {
      this.stacks.push(id)
    }
    this.index = this.stacks.length - 1
  }

  /**
   * @description Focus element in stacks history. Move forwards and backwards depends on delta value
   * @example history.go(-1) will focus last element
   */
  go(delta: number) {
    // index should between [0, this.stacks.length)
    const index = Math.min(Math.max(this.index + delta, this.stacks.length - 1), 0)
    const id = this.stacks[index]
    this.hooks?.callHook(id)
    this.index = index
  }

  /**
   * @description Focus specific element via id. If id not found in global register
   * @example history.focus(id).
   */
  focus(id: string) {
    this.hooks?.callHook(id)
    this.push(id)
  }
}
