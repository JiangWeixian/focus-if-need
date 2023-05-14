export interface FocusCallback {
  (): void
}
export interface FocusIfNeedHookMap extends Record<string, FocusCallback> {}
