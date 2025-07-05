pipeline {
  agent any

  triggers {
    githubPush()
  }

  environment {
    DEPLOY_USER = "root"
    DEPLOY_HOST = "152.228.170.244"
    DEPLOY_DIR = "/var/www/developmentcustomer"
    GIT_REPO = "git@github.com:drjonhoebernews/cmapps-customer.git"
    GIT_BRANCH = "development"
  }

  stages {
    stage('Deploy and Build on Remote') {
      steps {
        sh """
          echo "Hedef sunucuya SSH ile bağlanılıyor ve işlem başlatılıyor..."

          ssh \$DEPLOY_USER@\$DEPLOY_HOST << 'EOSSH'
            set -e

            cd /var/www/developmentcustomer

            echo "GIT clone çekiliyor..."
            git clone -b development git@github.com:drjonhoebernews/cmapps-customer.git .

            echo "NPM install ve build başlatılıyor..."
            npm install
            npm run build
            pm2 restart all
            echo "İşlem tamam!"
EOSSH
        """
      }
    }
  }
}