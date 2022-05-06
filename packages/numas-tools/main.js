'use strict'
const logger = require('./js/logger');
const iOSBuilder = require('./js/iOSBuilder');
const AndroidBuilder = require('./js/AndroidBuilder');

const PACKAGE_NAME = "numas-tools";

/*********************************************************************
 * 平台配置
 *********************************************************************/
// const platforms = ["android", "android-instant", "ios", "mac", "win32"]
const build_start = (event, target) => {
    logger.success(`----------------------------------------------------------------------------------`)
    logger.success(`-------- packages:${PACKAGE_NAME} 平台:${target.platform}  开始构建 --------`)
    switch (target.platform) {
        case "ios":
            iOSBuilder.build_start(target);
            break;
        case "android":
            AndroidBuilder.build_start(target);
            break;
        default:
            logger.info(`尚未支持 ${target.platform} 平台的构建`)
            break;
    }
}

const build_finished = (event, target) => {
    switch (target.platform) {
        case "ios":
            iOSBuilder.build_finished(target);
            break;
        case "android":
            AndroidBuilder.build_finished(target);
            break;
        default:
            logger.info(`尚未支持 ${target.platform} 平台的构建`)
            break;
    }
    Editor.success(`-------- packages:${PACKAGE_NAME} 平台:${target.platform}  构建结束 --------`)
    Editor.success(`----------------------------------------------------------------------------------`)
}

module.exports = {
    load() {
        /* 当 package 被正确加载的时候执行 */
        logger.info("Editor.Project.path >>" + Editor.Project.path);
    },
    unload() { /* 当 package 被正确卸载的时候执行 */ },
    messages: {
        'editor:build-finished': build_finished,
        'editor:build-start': build_start
    },
}
