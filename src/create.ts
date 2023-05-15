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
      timer = setInterval(() => {
        if (element.current) {
          element.current.focus()
          // @ts-expect-error -- works fine
          clearInterval(timer)
          timer = null
          history.push(id)
        }
      }, 100)
      /**
       * @description Clear focus interval timer
       */
      const abort = () => {
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
