import TestRenderer from 'react-test-renderer'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { useFocus } from '@/exports/react'

import type { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'

function toJson(component: ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as ReactTestRendererJSON
}

describe('react', () => {
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
      console.log(ref)
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
