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
                sh 'your-command-here'
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