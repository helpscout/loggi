export const LOG_METHODS = [
  'log',
  'group',
  'groupCollapsed',
  'groupEnd',
  'info',
  'table',
  'warn',
  'error',
]

export const LOG_LEVELS = {
  DEBUG: 0,
  LOG: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
}

export const LOG_METHOD_LEVELS = {
  log: 1,
  info: 1,
  table: 1,
  warn: 2,
  error: 3,
  group: 3,
  groupCollapsed: 3,
  groupEnd: 3,
}
