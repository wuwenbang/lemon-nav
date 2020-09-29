import { useRef, useEffect } from 'react'

const useUpdate = (fn: () => void, dependency: any[]) => {
  const count = useRef(0)
  useEffect(() => {
    count.current += 1
  })
  useEffect(() => {
    //避免第一次渲染时执行fn
    if (count.current > 1) {
      fn()
    }
  }, [fn, dependency])
}

export default useUpdate
