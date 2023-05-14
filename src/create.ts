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
      const clear = () => {
        // @ts-expect-error -- works fine
        clearInterval(timer)
        timer = null
      }
      return clear
    }
    const clear = callback()
    hooks.hook(id, callback)
    return clear
  }
  return {
    history,
    focus,
  }
}
