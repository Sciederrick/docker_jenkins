pipeline {
    agent any
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerHome = tool 'app_docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"  
                }
                sh 'docker build -t math_buddy:1.0 .'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Analyzing code with SonarQube'
            }
        }
        stage('Deploy to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jenkins_docker_dockerhub', passwordVariable: 'DOCKERHUB_PASSWORD', usenameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'docker login -u $DOCKERHUB_USERNAME -P $DOCKERHUB_PASSWORD'
                    sh 'docker tag math_buddy:1.0 sciederrick/math_buddy:1.0'
                    sh 'docker push sciederrick/math_buddy:1.0'
                    sh 'docker logout'
                }
            }
        }
    }
}