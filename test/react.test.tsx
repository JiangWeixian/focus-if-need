import TestRenderer from 'react-test-renderer'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { focusIfNeed, useFocus } from '@/exports/react'

import type { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'

function toJson(component: ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as ReactTestRendererJSON
}

describe('hooks', () => {
  let node: HTMLDivElement
  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    document.body.removeChild(node)
    node = null!
  })

  test('useFocus should work', async () => {
    let focused = false
    const Page = () => {
      const { ref } = useFocus<HTMLInputElement>('main')
      return (
        <div>
          <input
            ref={ref}
            placeholder="placeholder"
          />
        </div>
      )
    }

    let renderer: ReactTestRenderer
    await TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <Page />,
        {
          createNodeMock: (element) => {
            if (element.type === 'input') {
              // mock a focus function
              return {
                focus: () => {
                  focused = true
                },
              }
            }
            return null
          },
        },
      )
    })

    const tree = toJson(renderer!)
    expect(tree).toMatchSnapshot()
    expect(focused).toBe(true)
  })
})

describe('history', () => {
  test('history.stacks', async () => {
    let focused = false
    const Page = () => {
      const { ref } = useFocus<HTMLInputElement>('main')
      return (
        <div>
          <input
            ref={ref}
            placeholder="placeholder"
          />
        </div>
      )
    }

    await TestRenderer.act(() => {
      TestRenderer.create(
        <Page />,
        {
          createNodeMock: (element) => {
            if (element.type === 'input') {
              // mock a focus function
              return {
                focus: () => {
                  focused = true
                },
              }
            }
            return null
          },
        },
      )
    })

    expect(focused).toBe(true)
    expect(focusIfNeed.history.stacks).toMatchObject(['main'])
  })

  test('history.go(-1) should switch focus last element', async () => {
    let focusedEle = ''
    const Page = () => {
      const { ref } = useFocus<HTMLInputElement>('main')
      return (
        <div>
          <input
            ref={ref}
            onFocus={() => {
              focusedEle = 'input-0'
            }}
            data-testid="input-0"
          />
          <input
            onClick={() => {
              focusedEle = 'input-1'
            }}
            data-testid="input-1"
          />
          <button
            onClick={() => {
              focusIfNeed.history.go(-1)
            }}
          >
            Last focus
          </button>
        </div>
      )
    }

    let renderer: TestRenderer.ReactTestRenderer
    await TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <Page />,
        {
          // only works for ref element
          createNodeMock: (element) => {
            if (element.type === 'input') {
              // mock a focus function
              return {
                focus: () => {
                  focusedEle = element.props['data-testid']
                },
              }
            }
            return null
          },
        },
      )
    })

    expect(focusedEle).toBe('input-0')

    // @ts-expect-error -- renderer is defined
    const input = renderer.root.find((node) => {
      return node.props['data-testid'] === 'input-1'
    })
    await TestRenderer.act(() => input.props.onClick())
    expect(focusedEle).toBe('input-1')

    // @ts-expect-error -- renderer is defined
    const button = renderer.root.findByType('button')
    await TestRenderer.act(() => button.props.onClick())
    expect(focusedEle).toBe('input-0')
  })
})
