pipeline {
    agent {label 'java'}
    options {
        timeout(time: 25, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage("check version") {
            steps {
                script {
                    sh '''#!/bin/bash -xe
                         slack doctor
                         slack version -v
                         '''
                }
            }
        }
        stage("Check"){
                    parallel {
                        stage('Checkmarx') {
                            steps {
                                step([$class : 'SafeCheckmarxBuilder'])
                            }
                        }stage("Snyk") {
                                             steps {
                                                 withCredentials([string(credentialsId: 'SNYK_TOKEN', variable: 'SNYK_TOKEN')]) {
                                                     sh "./gradlew ${GRADLEW_ARGS} snyk-test -DSNYK_TOKEN=${SNYK_TOKEN}"
                                                 } //creds
                                             } //steps
                                         } //synk
                                         stage("Grover") {
                                                             steps {
                                                                 withCredentials([string(credentialsId: 'NEXUS_PROD_AUTH', variable: 'NPM_TOKEN')]) {
                                                                     checkout([
                                                                             $class                           : 'GitSCM',
                                                                             branches                         : [[name: '*/master']],
                                                                             doGenerateSubmoduleConfigurations: false,
                                                                             extensions                       : [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'Grover']],
                                                                             gitTool                          : 'Default',
                                                                             submoduleCfg                     : [],
                                                                             userRemoteConfigs                : [[
                                                                                                                         credentialsId: 'GITHUB_CREDENTIALS',
                                                                                                                         url          : 'https://github.com/salesforce-it/grover-plugin'

                                                                                                                 ]]])

                                                                     dir('Grover') {
                                                                         sh('#!/bin/bash +xe\n' + "${SOURCING}; nvm install v10 ")
                                                                         sh('#!/bin/bash +xe\n' + "${SOURCING}; nvm use 10 ")
                                                                         sh('npm install')
                                                                         sh "${GULP_BIN} groverScan --srcDir ../"
                                                                     } //dir
                                                                 } //creds
                                                             } //steps
                                                         } // stage grover
                                                          } //parallel scan
                                                                 } //check
                                                                 stage('Sonar Scan') {
                                                                             environment {
                                                                                 projectName = "sse:salesforce-it:slack"
                                                                             }
                                                                             steps {
                                                                                 withSonarQubeEnv('SonarQube') {
                                                                                     withCredentials([string(credentialsId: 'sonar', variable: 'TOKEN')]) {
                                                                                         sh "./gradlew --info --stacktrace sonarqube -Dsonar.login=${TOKEN} -Dsonar.projectKey=${projectName}"
                                                                                     } //creds
                                                                                 } //withSonarQubeEnv
                                                                             } //steps
                                                                         }//sonar  stage

                                                                         stage("Sonar Check"){
                                                                             steps{
                                                                                 sleep(10)
                                                                                 timeout(time: 10, unit: 'MINUTES'){
                                                                                     script{
                                                                                         def qg = waitForQualityGate()
                                                                                         if(qg.status != 'OK'){
                                                                                             error("Sonar check has failed. Status ${qg.status}")
                                                                                         }
                                                                                     }
                                                                                 }
                                                                             }
                                                                         }
        stage("Authenticate CLI") {
            steps {
                withCredentials([string(credentialsId: 'SLACK_USER_TOKEN', variable: 'SLACK_USER_TOKEN')]) {
                    sh '''#!/bin/bash -xe
                    slack login --auth SLACK_USER_TOKEN
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
    }
}
