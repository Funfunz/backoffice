import { useEffect, useState } from "react"

export function useDebouncedValue(value: any, delay: number = 200) {
  const [debouncedValue, setValue] = useState<any>()

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}