pipeline {
    agent { 
        label 'docker' 
    }
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('sizex-dockerhub')
    }

    stages {
        stage('Clone Repository') {
            steps {
                    git branch: 'main', url: 'http://gitea:3000/sizex/Ort-Class.git'
            }
        }

        stage('Verify Docker Installation') {
            steps {
                script {
                    sh 'docker --version'
                    sh 'docker-compose --version'
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    sh "docker-compose build"
                    sh "docker-compose up -d"
                    sh '''
                    docker tag ort-project-frontend-frontend sizex/ort-project-frontend-frontend:latest
                    '''
                }
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                script {
                    sh 'docker push sizex/ort-project-frontend-frontend:latest'
                }
            }
        }
    }
    post {
    	always {
    		sh 'docker logout'
    	}
    }
}