import { useEffect, useRef } from 'react'

import { focusIfNeed } from './index'

export const useFocus = <T = any>(id: string) => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const { clear } = focusIfNeed.focus(id, ref)
    return () => {
      clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return {
    ref,
  }
}

export { focusIfNeed } from './index'
