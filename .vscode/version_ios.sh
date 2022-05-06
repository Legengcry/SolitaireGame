#!/bin/bash

# 下面是参数说明：
# - `-v` 指定 Manifest 文件的主版本号。
# - `-u` 指定服务器远程包的地址，这个地址需要和最初发布版本中 Manifest 文件的远程包地址一致，否则无法检测到更新。
# - `-s` 本地原生打包版本的目录相对路径。
# - `-d` 保存 Manifest 文件的地址。


# cd
projectRoot=$(cd "$(dirname "$0")";pwd)

_version=$(cat $projectRoot/version.txt)

echo ">> 资源版本：$_version"


_dstManifestPath="assets/StartScene/StartBundle/Res/Asset"

# generate manifest (change version first!).
node packages/hot-update/version_generator.js -v $_version -u https://solitaire.numas.ltd/ios/remote-assets/ -s ./build/jsb-link/ -d $_dstManifestPath

# remove old remote-assets
if [ -d "./remote-assets/" ];then
  rm -rf ./remote-assets/
fi

# output new remote-assets
mkdir -p ./remote-assets/assets/
mkdir -p ./remote-assets/src/
cp -a ./build/jsb-link/assets/ ./remote-assets/assets/
cp -a ./build/jsb-link/src/ ./remote-assets/src/
cp -a "$_dstManifestPath/project.manifest" ./remote-assets/
cp -a "$_dstManifestPath/version.manifest" ./remote-assets/
