const { createLogger, format, transports } = require('winston');

/**
 * Log.
 *
 * @example logger.info(message)
 * @example logger.error(message)
 * @param {*} message Log Message
 */

const logger = createLogger({
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint(),
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
