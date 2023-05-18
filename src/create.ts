import { createHooks } from 'hookable'

import { FocusHistory } from './history'

import type { RefObject } from 'react'
import type { FocusCallback, FocusIfNeedHookMap } from './types'

export const createFocusIfNeed = () => {
  const hooks = createHooks<FocusIfNeedHookMap>()
  const history = FocusHistory.create({ hooks })
  const focus = (id: string, element: RefObject<any>) => {
    /**
     * @description Focus element if avaliable
     */
    const callback: FocusCallback = () => {
      let timer: NodeJS.Timer | null
      const job = () => {
        // If element is already focused, abort
        if (typeof document !== 'undefined' && document.activeElement === element.current) {
          abort()
        }
        if (element.current) {
          element.current.focus()
          abort()
          history.push(id)
        }
      }
      job()
      timer = setInterval(job, 60)
      /**
       * @description Clear focus interval timer
       */
      function abort() {
        // @ts-expect-error -- works fine
        clearInterval(timer)
        timer = null
      }
      return { abort }
    }
    const { abort } = callback()
    // @ts-expect-error -- ignore it?
    const unregister = hooks.hook(id, callback)
    /**
     * @description Clear focus interval timer; Unregister global hook
     */
    const clear = () => {
      abort()
      unregister()
    }
    return { clear }
  }
  return {
    history,
    focus,
  }
}
