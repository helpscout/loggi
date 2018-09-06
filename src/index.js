import {
  LOG_LEVELS,
  LOG_METHODS,
  LOG_METHOD_LEVELS,
} from './constants'

const createLogger = (userOptions = {}) => {
  const defaults = {
    logLevel: LOG_LEVELS.DEBUG,
    maxMemoryLogs: 100,
  }
  const options = {
    ...defaults,
    ...userOptions,
  }

  let history = []

  const shouldPrint = method => LOG_METHOD_LEVELS[method] >= options.logLevel

  const print = (method, ...args) => console[method](...args)

  const log = (method, ...args) => {
    history.push({
      method,
      args,
      timestamp: Date.now(),
    })

    history = history.slice(0, options.maxMemoryLogs)

    shouldPrint(method) && print(method, ...args)
  }

  const debug = () => {
    history.map(({ method, args }) => print(method, ...args))
  }

  const returnObject = {
    debug,
    getHistory: () => history,
  }

  LOG_METHODS.map(
    method => (returnObject[method] = (...args) => log(method, ...args))
  )

  return returnObject
}

export default createLogger
