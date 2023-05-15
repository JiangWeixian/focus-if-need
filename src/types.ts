export interface FocusCallback {
  (): { abort: () => void }
}
export interface FocusIfNeedHookMap extends Record<string, FocusCallback> {}
