export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const desktopSize = 1120;