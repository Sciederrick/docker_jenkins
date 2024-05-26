pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'sciederrick'
        DOCKER_IMAGE = 'math_buddy'
        NODE_VERSION = '20.x'
        DOCKERHUB_CREDENTIALS = credentials('sciederrick_dockerhub')
    }
    tools {
        nodejs NODE_VERSION 
    }
    triggers {
        pollSCM 'H/30 * * * *'
    }
    stages {
        stage('Build') {
            steps {
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                sh 'npx eslint .'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'docker tag ${DOCKER_IMAGE}:latest ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:staging'
                    sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:staging'
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    sh 'docker images'
                    sh 'docker tag ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:staging ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:production'
                    sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:production'
                }
            }
        }

    }

    post {
        always {
            sh 'docker logout'
            // Clean up
            cleanWs()
        }
        success {
            mail to: 'derrickmbarani@gmail.com',
                 subject: "Success: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                 body: "The job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed successfully."
        }
        failure {
            mail to: 'derrickmbarani@gmail.com',
                 subject: "Failure: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                 body: "The job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed. Please check the Jenkins logs for details."
        }
    }

}
