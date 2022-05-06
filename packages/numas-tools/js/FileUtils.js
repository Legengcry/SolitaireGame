const fs = require('fs')
const path = require('path')

class FileUtil {
    /*
     * 获取磁盘上的文件目录以及文件列表信息
     * @param { String } localDir 本地路径
     * @return { files, dirs }
     * */
    listDirsAndFiles(localDir) {
        const dirs = []
        const files = []
        const dir = fs.readdirSync(localDir)
        for (let i = 0; i < dir.length; i++) {
            const p = path.join(localDir, dir[i])
            const stat = fs.statSync(p)
            if (stat.isDirectory()) {
                dirs.push(p)
                const children = this.listDirsAndFiles(p)
                dirs.push(...children.dirs)
                files.push(...children.files)
            } else {
                files.push(p)
            }
        }
        return {
            files,
            dirs
        }
    }

    /**
     * 拷贝文件或目录。
     * @param src
     * @param dst
     */
    copy(src, dst) {
        const st = fs.statSync(src);
        if (st.isFile()) {
            const data = fs.readFileSync(src);
            fs.writeFileSync(dst, data);
            return;
        }

        if (!fs.existsSync(dst)) {
            fs.mkdirSync(dst, {recursive: true});
        }

        //读取目录
        const files = fs.readdirSync(src);
        for (let p of files) {
            this.copy(src + path.sep + p, dst + path.sep + p);
        }
    };

    write(filePath, content) {
        const pathInfo = path.parse(filePath);
        if (!fs.existsSync(pathInfo.dir)) {
            fs.mkdirSync(pathInfo.dir, {recursive: true});
        }
        fs.writeFileSync(filePath, content, 'utf-8');
    }

    remove(filePath) {
        if(fs.existsSync(filePath)) {
            fs.removeSync(filePath)
        }
    }
}

module.exports = new FileUtil();
