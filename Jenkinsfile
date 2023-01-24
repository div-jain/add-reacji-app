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
                    withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                        sh('#!/bin/bash +xe\n' + "${SOURCING}; curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh")
                         sh ('slack login --auth $SLACK_USER_TOKEN')
                          sh 'slack deploy'
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
