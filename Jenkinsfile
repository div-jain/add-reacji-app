APPS = ['add-reacji-app']
SOURCING = "source ~/.profile"
pipeline {
    agent any
    options {
        timeout(time: 25, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage("Install Slack CLI") {
                    steps {
                        sh('#!/bin/bash +xe\n' + "${SOURCING}; curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh")


                    }
                }
        stage("Authenticate CLI") {
            steps {
             withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                    sh('$slack_cli_name login --auth $SLACK_USER_TOKEN')
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                   sh '$slack_cli_name deploy'
                }
            }
        }
    }
}
def deploy(String app){
    sh "slack deploy"
}
