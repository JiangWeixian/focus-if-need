import { useEffect } from 'react'

import { focusIfNeed } from './index'

import type { RefObject } from 'react'

export const useFocusIfNeed = (id: string, element: RefObject<any>) => {
  useEffect(() => {
    focusIfNeed.focus(id, element)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
}

export { focusIfNeed } from './index'
