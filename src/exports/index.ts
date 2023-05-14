/**
 * @fileoverview focus if need
 * - automatic focus element if avaliable
 * - TODO: if active element changed, should automatic focus on last focused element
 */

import { createFocusIfNeed } from '../create'

export { createFocusIfNeed } from '../create'
export type { FocusIfNeedHookMap } from '../create'
export const focusIfNeed = createFocusIfNeed()
