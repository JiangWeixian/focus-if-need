export class FocusHistory {
  stacks: string[]
  constructor() {
    this.stacks = []
  }

  static create() {
    return new FocusHistory()
  }
}
