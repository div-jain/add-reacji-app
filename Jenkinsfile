APPS = ['add-reacji-app']
SOURCING = "source /opt/.profile"
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
                script {
                    withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                        sh '''
                                 set +x
                                 slack login --auth $SLACK_USER_TOKEN
                           '''
                    }
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
def checkoutRepo(String app) {
    dir(app) {
        git(
                poll: true,
                url: "https://github.com/salesforce-it/${app}",
                branch: 'master',
                credentialsId: 'GITHUB_CREDENTIALS'
        )
    }
}
def deploy(String app){
    sh "slack deploy"
}
