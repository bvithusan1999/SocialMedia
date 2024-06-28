pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/mern-app.git'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.build('mern-backend:latest', './backend').push('your-dockerhub-username/mern-backend:latest')
                    docker.build('mern-frontend:latest', './frontend').push('your-dockerhub-username/mern-frontend:latest')
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
