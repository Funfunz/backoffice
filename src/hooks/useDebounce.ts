import { useEffect, useState } from "react"

export function useDebouncedValue(value: any, delay: number = 200) {
  const [debouncedValue, setDebouncedValue] = useState<any>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, setDebouncedValue]
}