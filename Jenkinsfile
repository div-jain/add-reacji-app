pipeline {
    agent {label 'java'}
    options {
        timeout(time: 25, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage("Check version") {
            steps {
                script {
                    sh '''#!/bin/bash -xe
                         slack doctor
                         slack version -v
                         '''
                }
            }
        }

        stage("Authenticate CLI") {
            steps {
                withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                    sh '''#!/bin/bash -xe
                    slack login --auth $SLACK_USER_TOKEN
                    '''
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    sh '''#!/bin/bash -xe
                    slack deploy
                    '''
                }
            }
        }
        stage("Activity") {
                    steps {
                        script {
                            sh '''#!/bin/bash -xe
                            slack activity
                            '''
                        }
                    }
                }
    }
}
