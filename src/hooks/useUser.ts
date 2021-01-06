import { useSelector } from 'reducers'

export default function useUser() {
  const user = useSelector((state) => {
    return state.user
  })

  return user
}