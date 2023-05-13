import { createHooks } from 'hookable'

import { FocusHistory } from './history'

import type { RefObject } from 'react'

interface FocusCallback {
  (): void
}

export interface FocusIfNeedHookMap extends Record<string, FocusCallback> {}

export const createFocusIfNeed = () => {
  const hooks = createHooks<FocusIfNeedHookMap>()
  const history = new FocusHistory()
  const focus = (id: string, element: RefObject<any>) => {
    const callback: FocusCallback = () => {
      let timer: NodeJS.Timer | null
      timer = setInterval(() => {
        if (element.current) {
          element.current.focus()
          // @ts-expect-error -- works fine
          clearInterval(timer)
          timer = null
          history.stacks.push(id)
        }
      }, 100)
    }
    callback()
    hooks.hook(id, callback)
  }
  return {
    hooks,
    history,
    focus,
  }
}
