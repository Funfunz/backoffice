
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const desktopSize = 1120

export function friendlyName(name: string) {
  let result = ''
  for(const letter of name) {
    if (letter.toUpperCase() === letter) {
      result += ` ${letter}`
    } else if (result === '') {
      result += letter.toUpperCase()
    } else {
      result += letter
    }
  }
  return result
}