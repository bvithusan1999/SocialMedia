pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

     

        stage('Deploy') {
            steps {
                script {
                   
                    bat 'docker-compose up --build -d'
                }
            }
        }
    }

    post {

        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}