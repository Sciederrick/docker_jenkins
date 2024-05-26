pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'sciederrick'
        DOCKER_IMAGE = 'math_buddy'
    }
    triggers {
        pollSCM 'H/30 * * * *'
    }
    stages {
        stage('Build') {
            sh 'npm install'
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    sh 'npx eslint .'
                }
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

        // stage('Monitoring and Alerting') {
        //     steps {
        //         script {
        //             // Example of triggering a monitoring tool (Datadog)
        //             sh '''
        //             curl -X POST "https://api.datadoghq.com/api/v1/monitor" \
        //                 -H "Content-Type: application/json" \
        //                 -H "DD-API-KEY: your-datadog-api-key" \
        //                 -d '{
        //                     "name": "Production Deployment",
        //                     "type": "metric alert",
        //                     "query": "avg(last_1h):avg:system.cpu.idle{environment:production} by {host} < 20",
        //                     "message": "High CPU usage detected in production",
        //                     "tags": ["env:production"],
        //                     "options": {
        //                         "notify_no_data": false,
        //                         "no_data_timeframe": 2
        //                     }
        //                 }'
        //             '''
        //         }
        //     }
        // }
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
