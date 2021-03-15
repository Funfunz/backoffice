import { useState } from "react"

const DEFAULT_SKIP = 0
const DEFAULT_TAKE = 10

export function usePagination() {
  
  const [skip, setSkip] = useState(DEFAULT_SKIP)
  const [take, setTake] = useState(DEFAULT_TAKE)

  return {
    skip,
    setSkip,
    take,
    setTake,
  }
}
