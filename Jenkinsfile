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
                         }
                    }
                }
        stage("Authenticate CLI") {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                        def out = sh (script: "slack login", returnStdout: true)
                        println(out)
                        def extractedString = out =~ /\/slackauthticket(.+)/
                        println(extractedString​[0][0])
                        slackSend(channel: "U01G8012891", text: extractedString)
                    }
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
