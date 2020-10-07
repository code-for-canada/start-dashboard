import { useEffect, useState } from 'react'

// Source: https://joshwcomeau.com/react/persisting-react-state-in-localstorage/
export default (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key)

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
