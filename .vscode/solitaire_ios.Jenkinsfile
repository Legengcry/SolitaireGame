pipeline {
  agent any
  environment {
    PROJECT = "ORServer"
    USER_NAME = 'HuaxingZheng'
    USER_EMAIL = 'huaxing_zheng@qq.com'
  }
  stages {
    stage('部署') {
      steps {
        echo '控制远程拉取最新代码...'
        script {
          def remote = [:]
          remote.allowAnyHosts = true
          remote.name = HX_REMOTE_NAME
          remote.host = HX_REMOTE_HOST
          remote.user = HX_REMOTE_USER

          withCredentials([sshUserPrivateKey(credentialsId: HX_SERVER_ID_RSA, keyFileVariable: 'id_rsa')]) {
            remote.identityFile = id_rsa
            sshCommand remote: remote, sudo: true, command: '''
                mkdir -p /data/repos /data/www/ORServer/gameres/solitaire/ios

                # 从 Coding 拉取项目工程
                if [ ! -d /data/repos/solitaire_ios ]; then
                    git clone git@e.coding.net:numas/ORServer/solitaire_ios.git /data/repos/solitaire_ios
                else
                    cd /data/repos/solitaire_ios
                    git pull origin master
                fi

                # 拷贝 工程
                cd /data/repos/solitaire_ios
                git checkout-index -a -f --prefix=/data/www/ORServer/gameres/solitaire/ios/

                # 重启 Nginx 服务
                if [ -e "/data/www/ORServer/logs/nginx.pid" ]; then
                    echo "openresty is running --> reloading openresty";
                    /usr/bin/systemctl reload openresty.service
                    echo "--> openresty reloaded";
                else 
                    echo "openresty is not running --> starting openresty";
                    /usr/bin/systemctl start openresty.service
                    echo "--> openresty started";
                fi;
            '''
          }
        }
 
        echo '部署完成'
      }
    }
  }
}