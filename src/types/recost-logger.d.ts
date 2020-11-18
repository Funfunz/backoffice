declare module 'recost-logger' {
  type MiddlewareFunc = ((state: State, action: IAction, dispatcher?: Dispatcher) => void)
  const logger = {
    before: MiddlewareFunc,
    after: MiddlewareFunc,
  }
  export default logger
}