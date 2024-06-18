pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = '8212dd2f-1031-4d21-9883-c00f65004442'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/dipyomoybarua/api-cypress-js-automation'
            }
        }
        stage('Install Dependencies') {
            steps {
                // bat 'npm install --legacy-peer-deps'
                 bat 'npm  install'
            }
        }
        stage('Run Tests in Parallel') {
            steps {
                script {
                    def cypressEnv = [
                        "CYPRESS_RECORD_KEY=${env.CYPRESS_RECORD_KEY}"
                    ]
                    def parallelism = 3
                    def instances = [:]  // Use a map instead of a list

                    for (int i = 1; i <= parallelism; i++) {
                        def instance = i
                        def ciBuildId = UUID.randomUUID().toString()  // Generate a unique build ID for each instance
                        instances["Cypress Instance ${instance}"] = {
                            withEnv(cypressEnv + ["CYPRESS_CI_BUILD_ID=${ciBuildId}"]) {
                                bat "npx cypress run --record --parallel --group ${instance} --ci-build-id ${ciBuildId}"
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
            archiveArtifacts artifacts: '**', followSymlinks: false
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
