import {
  LOG_LEVELS,
  LOG_METHODS,
  LOG_METHOD_LEVELS,
} from './constants'

/**
 * Prints the arguments in the console using the provided method.
 *
 * @param {string} method
 * @param  {...any} args
 */
const print = (method, ...args) => console[method](...args)

/**
 * Determines if the method should print to the console.
 *
 * @param {string} method
 * @param {string} logLevel
 * @returns {boolean}
 */
const shouldPrint = (method, logLevel) => LOG_METHOD_LEVELS[method] >= logLevel

/**
 * Logger constructor function
 *
 * @param {object} userOptions
 * @returns {object}
 */
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

  /**
   * Saves the log in memory and prints it out,
   * depending on the log level.
   *
   * @param {string} method
   * @param  {...any} args
   */
  const log = (method, ...args) => {
    history.push({
      method,
      args,
      timestamp: Date.now(),
    })

    history = history.slice(0, options.maxMemoryLogs)

    shouldPrint(method, options.logLevel) && print(method, ...args)
  }

  /**
   * Loops through the history array and prints all messages
   * from the logger's memory.
   */
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
export { LOG_LEVELS, LOG_METHODS, LOG_METHOD_LEVELS }
