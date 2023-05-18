import { focusIfNeed, useFocus } from 'focus-if-need/react'
import { useEffect, useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)
  const { ref } = useFocus<HTMLInputElement>('main')
  // refs: https://hidde.blog/console-logging-the-focused-element-as-it-changes/
  useEffect(() => {
    const callback = () => {
      console.log('focused: ', document.activeElement)
    }
    document.addEventListener('focusin', callback, true)
    return () => {
      document.removeEventListener('focusin', callback, true)
    }
  }, [])
  return (
    <div>
      <input
        onFocus={(e) => {
          console.log('Focused on input')
        }}
        ref={ref}
        placeholder="placeholder"
      />
      <button
        className="btn-square btn"
        onClick={() => setCount(prev => prev + 1)}
      >
        click {count}
      </button>
      <div
        tabIndex={0}
        className="btn-square btn"
        onClick={() => {
          console.log(focusIfNeed.history.stacks)
          focusIfNeed.history.go(-1)
        }}
      >
        Last focus
      </div>
    </div>
  )
}

export default Home
