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

  push(id: string) {
    if (this.stacks[this.stacks.length - 1] !== id) {
      this.stacks.push(id)
    }
    this.index = this.stacks.length - 1
  }

  go(delta: number) {
    // index should between [0, this.stacks.length)
    const index = Math.min(Math.max(this.index + delta, this.stacks.length - 1), 0)
    const id = this.stacks[index]
    this.hooks?.callHook(id)
  }
}
