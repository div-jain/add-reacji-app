APPS = ['add-reacji-app']
SOURCING = "source ~/.profile"
pipeline {
    agent {label 'java'}
    options {
        timeout(time: 25, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage("Authenticate CLI") {
            steps {
             withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                    sh('slack login --auth $SLACK_USER_TOKEN')
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                   sh 'slack deploy'
                }
            }
        }
    }
}
def deploy(String app){
    sh "slack deploy"
}
