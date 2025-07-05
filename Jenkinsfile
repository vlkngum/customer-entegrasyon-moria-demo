pipeline {
  agent any

  triggers {
    githubPush()
  }

  environment {
    DEPLOY_USER = "root"
    DEPLOY_HOST = "152.228.170.244"
    DEPLOY_DIR = "/var/www/entekas-web-dev"
    GIT_REPO = "git@github.com:drjonhoebernews/entekas-web.git"
    GIT_BRANCH = "development"
  }

  stages {
    stage('Deploy and Build on Remote') {
      steps {
        sh """
          echo "Hedef sunucuya SSH ile bağlanılıyor ve işlem başlatılıyor..."

          ssh \$DEPLOY_USER@\$DEPLOY_HOST << 'EOSSH'
            set -e

            cd /var/www/entekas-web-dev

            echo "GIT clone çekiliyor..."
            git pull

            echo "NPM install ve build başlatılıyor..."
            npm install
            npm run build
            pm2 start node_modules/next/dist/bin/next --name entekas-web-development -- start --port 3002
            echo "şlem tamam!"
EOSSH
        """
      }
    }
  }
}