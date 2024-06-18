pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = '<ku86j9>'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/dipyomoybarua/api-cypress-js-automation'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }
        stage('Run Tests in Parallel') {
            steps {
                script {
                    def cypressEnv = [
                        "CYPRESS_RECORD_KEY=${env.CYPRESS_RECORD_KEY}"
                    ]
                    def parallelism = 3
                    def instances = [:]

                    for (int i = 1; i <= parallelism; i++) {
                        def instance = i
                        instances["Cypress Instance ${instance}"] = {
                            withEnv(cypressEnv) {
                                bat "npx cypress run --record --parallel --group ${instance}"
                            }
                        }
                    }
                    parallel instances
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'target/**', followSymlinks: false
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
