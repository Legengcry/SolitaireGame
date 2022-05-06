/**
 * fs-extra： https://github.com/jprichardson/node-fs-extra
 */
const fs = require('fs-extra');
const path = require("fire-path");
const fileUtils = require('./FileUtils');
const logger = require('./logger');

class iOSBuilder {
    _creatorProjectRoot = null; // Project/
    _cocosBuildAssetsPath = null; //Project/build-assets/
    _buildJsbLink = null; // Project/build/jsb-link
    _buildProjectJsonPath = null; // Project/build/jsb-link/project.json

    build_start(target) {
        this._creatorProjectRoot = path.join(__dirname, `../../../`)
        this._cocosBuildAssetsPath = path.join(this._creatorProjectRoot, `build-assets`)
        this._buildJsbLink = path.normalize(target.dest)
    }

    build_finished(target) {
        try {        
            // 图标拷贝
            const images_xcassets_src_path = path.join(this._cocosBuildAssetsPath, `ios/Images.xcassets/`)
            const images_xcassets_dst_path = path.join(this._buildJsbLink, "frameworks/runtime-src/proj.ios_mac/ios/Images.xcassets/")
            fs.copySync(images_xcassets_src_path, images_xcassets_dst_path) // copies directory, even if it has subdirectories or files
            logger.success('拷贝 Images.xcassets 图标资源')

            // 拷贝 LaunchScreenBackground.png
            const LaunchScreenBackground_PNG_src_path = path.join(this._cocosBuildAssetsPath, `ios/LaunchScreenBackground.png`)
            const LaunchScreenBackground_PNG_dst_path = path.join(this._buildJsbLink, "frameworks/runtime-src/proj.ios_mac/ios/LaunchScreenBackground.png")
            fs.copySync(LaunchScreenBackground_PNG_src_path, LaunchScreenBackground_PNG_dst_path)
            logger.success(`拷贝 ${LaunchScreenBackground_PNG_src_path}`)


            /**
             * 广告 SDK 依赖拷贝：
             */
            const frameworks_dst_path = path.join(this._buildJsbLink, "frameworks/runtime-src/proj.ios_mac/") /** 目标位置 */
            const SDK_SRC_PATH = path.join(this._cocosBuildAssetsPath, `ios/Frameworks/`);
            fs.copySync(SDK_SRC_PATH, frameworks_dst_path)
            logger.success('拷贝 Frameworks到 proj.ios_mac/')

            // Classes: NMSDKManager, IronSource
            const classes_src_path = path.join(this._cocosBuildAssetsPath, `ios/Classes/`)
            const classes_dst_path = path.join(this._buildJsbLink, "frameworks/runtime-src/proj.ios_mac/ios/")
            fs.copySync(classes_src_path, classes_dst_path) // copies directory, even if it has subdirectories or files
            logger.success('拷贝 Classes 下的 .h 和 .mm 文件到 proj.ios_mac/ios/')

            // 将 SKAdNetworkItems 写入 info.plist
            const _isCopyInfoPlist = false;
            if(_isCopyInfoPlist) {
                const src_info_plist_path = path.join(this._cocosBuildAssetsPath, "ios/Info.plist")
                const dst_info_plist_path = path.join(this._buildJsbLink, "frameworks/runtime-src/proj.ios_mac/ios/Info.plist")
                fs.copySync(src_info_plist_path, dst_info_plist_path)
                logger.success(`拷贝 ${src_info_plist_path}`)
            }

            // 修改 project.json
            this._buildProjectJsonPath = path.join(this._buildJsbLink, "project.json")
            let projectJsonData = fs.readJsonSync(this._buildProjectJsonPath)
            // 添加 "NMSDKManager" 到 project.json 的 "serviceClassPath" 字段
            projectJsonData["serviceClassPath"] = ["NMSDKManager"]
            fs.writeJsonSync(this._buildProjectJsonPath, projectJsonData)
            logger.success(`添加 NMSDKManager 到 project.json 的 "serviceClassPath" 字段`)

        } catch (err) {
            logger.error(err)
        }
    }
}

module.exports = new iOSBuilder;
