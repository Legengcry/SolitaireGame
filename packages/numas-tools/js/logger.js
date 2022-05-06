const logger = (global && global.Editor) || (global && global.console) || (window && window.console);
/**
 * 适配不同 logger 对象.
 * @type {{warn: (message?: any, ...optionalParams: any[]) => void, log: (message?: any, ...optionalParams: any[]) => void, success: any | ((message?: any, ...optionalParams: any[]) => void), error: (message?: any, ...optionalParams: any[]) => void, info: (message?: any, ...optionalParams: any[]) => void}}
 */
module.exports = {
    log: logger.log,
    info: logger.info,
    warn: logger.warn,
    error: logger.error,
    success: logger.success
}
