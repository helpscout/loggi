# loggi
> A memory log util for JavaScript Applications

## Table of contents

* [🔧 Installation](./#-installation)
* [🕹 Usage](./#🕹-usage)

## 🔧 Installation

```
npm install loggi --save
```

## 🕹 Usage

### Basic Usage

```javascript
import createLogger from 'loggi'

const Logger = createLogger()

Logger.log('log message')
Logger.info('info message')
Logger.warn('warn message')
Logger.error('error message')
```

### Log Levels and Debug

```javascript
import createLogger, { LOG_LEVELS } from 'loggi'

const Logger = createLogger({
  logLevel: LOG_LEVELS.ERROR,
})

Logger.log('log message')
Logger.info('info message')
Logger.warn('warn message')
Logger.error('error message')

// Prints:
// > error: 'error message'

Logger.debug()

// Prints:
// > log: 'log message'
// > info: 'info message'
// > warn: 'warn message'
// > error: 'error message'
```
