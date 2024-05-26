pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'sciederrick'
        DOCKER_IMAGE = 'math_buddy'
        NODE_VERSION = '20.x'
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
                    sh 'docker tag ${DOCKER_IMAGE}:staging ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:production'
                    sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:production'
                }
            }
        }

    }

    post {
        always {
            // Clean up
            cleanWs()
        }
        // success {
        //     // Notify success (example using email)
        //     mail to: 'your-email@example.com',
        //          subject: "Success: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        //          body: "The job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed successfully."
        // }
        // failure {
        //     // Notify failure
        //     mail to: 'your-email@example.com',
        //          subject: "Failure: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        //          body: "The job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed. Please check the Jenkins logs for details."
        // }
    }

}
