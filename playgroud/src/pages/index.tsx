import { useFocusIfNeed } from 'focus-if-need/react'
import { useRef, useState } from 'react'

const Home = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [count, setCount] = useState(0)
  useFocusIfNeed('main', ref)
  return (
    <div>
      <input ref={ref} placeholder="placeholder" />
      <button
        className="btn-square btn"
        onClick={() => setCount(prev => prev + 1)}
      >
        click {count}
      </button>
    </div>
  )
}

export default Home
