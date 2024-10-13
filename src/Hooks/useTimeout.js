import { useEffect, useRef } from 'react'
export function useTimeout(callback,delay,...args) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(...args), delay)
    return () => clearTimeout(timeoutId)
  }, [delay,...args])
}
