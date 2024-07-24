export function waitForPromise(second: number) {
  return new Promise((resolve) => setTimeout(() => resolve(1), second))
}
