const fs = require('fs-extra');
const path = require("fire-path");
const fileUtils = require('./FileUtils');
const logger = require('./logger');

class AndroidBuilder {
    _rootPath = null; // Project/build/jsb-link
    _sdkJsonPath = null; // Project/build/jsb-link/sdk.json
    _projectJsonPath = null; // Project/build/jsb-link/project.json

    build_start(target) {
        // this._rootPath = path.normalize(target.dest);
        // this._sdkJsonPath = path.join(this._rootPath, "sdk.json");
        // this._projectJsonPath = path.join(this._rootPath, "project.json");
        // this._sdkConfigJsonPathDst = path.join(this._rootPath, "sdkCfg.json")
        // fileUtils.remove(this._sdkJsonPath);
    }
    build_finished(target) {
        // try {
        //     // 添加 "NMSDKManager" 到 project.json 的 "serviceClassPath" 字段
        //     let projectJsonData = fs.readJsonSync(this._projectJsonPath)
        //     projectJsonData["serviceClassPath"] = ["org.cocos2dx.javascript.NMSDKManager"]
        //     fs.writeJsonSync(this._projectJsonPath, projectJsonData)
        //     logger.success(`添加 org.cocos2dx.javascript.NMSDKManager 到 project.json 的 "serviceClassPath" 字段`)

        //     // sdkCfg.json 
        //     __CopySDKConfigJson(target);
        //     const sdk_json_src_path = path.join(__dirname, `/../../assets/sdkCfg.json`)
        //     fs.copySync(sdk_json_src_path, this._sdkConfigJsonPathDst)
        //     logger.success(`拷贝 ${sdk_json_src_path} 到 ${sdk_json_dst_path}`)

        //     // Classes: NMSDKManager, IronSource
        //     const classes_src_path = path.join(__dirname, `/../../build-assets/android/JavaClasses/`)
        //     const classes_dst_path = path.join(this._rootPath, "frameworks/runtime-src/proj.android-studio/src/org/cocos2dx/javascript/")
        //     fs.copySync(classes_src_path, classes_dst_path) // copies directory, even if it has subdirectories or files
        //     logger.success('拷贝 Classes 下的 .java 文件到 proj.android-studio/src/org/cocos2dx/javascript/')
        // } catch (err) {
        //     logger.error(err)
        // }
    }
}

module.exports = new AndroidBuilder;
