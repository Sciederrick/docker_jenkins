pipeline {
    agent { dockerfile true }
    triggers {
        pollSCM '* * * * *'
    }
    stages {

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

    }
}