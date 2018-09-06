import createLogger, {
  LOG_LEVELS,
  LOG_METHODS,
  LOG_METHOD_LEVELS,
} from '../'

describe('loggi tests', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation()
  const infoSpy = jest.spyOn(console, 'info').mockImplementation()
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
  const errorSpy = jest.spyOn(console, 'error').mockImplementation()

  beforeEach(() => {
    logSpy.mockClear()
    infoSpy.mockClear()
    warnSpy.mockClear()
    errorSpy.mockClear()
  })

  describe('log level', () => {
    it('should print all messages if log level is DEBUG', () => {
      const Logger = createLogger()

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).toHaveBeenCalledWith('log message')
      expect(infoSpy).toHaveBeenCalledWith('info message')
      expect(warnSpy).toHaveBeenCalledWith('warn message')
      expect(errorSpy).toHaveBeenCalledWith('error message')
    })

    it('should print logs and up if log level is LOG', () => {
      const Logger = createLogger({
        logLevel: LOG_LEVELS.LOG,
      })

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).toHaveBeenCalledWith('log message')
      expect(infoSpy).toHaveBeenCalledWith('info message')
      expect(warnSpy).toHaveBeenCalledWith('warn message')
      expect(errorSpy).toHaveBeenCalledWith('error message')
    })

    it('should print warns and up if log level is WARN', () => {
      const Logger = createLogger({
        logLevel: LOG_LEVELS.WARN,
      })

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).not.toHaveBeenCalled()
      expect(infoSpy).not.toHaveBeenCalled()
      expect(warnSpy).toHaveBeenCalledWith('warn message')
      expect(errorSpy).toHaveBeenCalledWith('error message')
    })

    it('should print only errors if log level is ERROR', () => {
      const Logger = createLogger({
        logLevel: LOG_LEVELS.ERROR,
      })

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).not.toHaveBeenCalled()
      expect(infoSpy).not.toHaveBeenCalled()
      expect(warnSpy).not.toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledWith('error message')
    })

    it('should not print any messages if log level is SILENT', () => {
      const Logger = createLogger({
        logLevel: LOG_LEVELS.SILENT,
      })

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).not.toHaveBeenCalled()
      expect(infoSpy).not.toHaveBeenCalled()
      expect(warnSpy).not.toHaveBeenCalled()
      expect(errorSpy).not.toHaveBeenCalled()
    })
  })

  describe('max memory logs', () => {
    it('should only store up to MAX logs in memory', () => {
      const MAX_LOGS = 10
      const Logger = createLogger({
        maxMemoryLogs: MAX_LOGS,
      })

      for (let i = 0; i < 20; i += 1) {
        Logger.log(`log number ${i}`)
      }

      expect(logSpy).toHaveBeenCalledTimes(20)
      expect(Logger.getHistory().length).toBe(MAX_LOGS)
    })
  })

  describe('debug', () => {
    it('should print all messages from the history independently of the log level', () => {
      const Logger = createLogger({
        logLevel: LOG_LEVELS.ERROR,
      })

      Logger.log('log message')
      Logger.info('info message')
      Logger.warn('warn message')
      Logger.error('error message')

      expect(logSpy).not.toHaveBeenCalled()
      expect(infoSpy).not.toHaveBeenCalled()
      expect(warnSpy).not.toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledWith('error message')

      Logger.debug()

      expect(logSpy).toHaveBeenCalledWith('log message')
      expect(infoSpy).toHaveBeenCalledWith('info message')
      expect(warnSpy).toHaveBeenCalledWith('warn message')
      expect(errorSpy).toHaveBeenCalledWith('error message')
    })
  })
})
