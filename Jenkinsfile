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
                // Clean up previous node_modules to avoid conflicts
                bat 'rmdir /s /q node_modules'

                // Choose one of the following approaches:

                // Option 1: Force install dependencies (may lead to unexpected behavior)
                bat 'npm install --force'

                // OR Option 2: Use legacy peer dependencies (may ignore peer dependency warnings)
                // bat 'npm install --legacy-peer-deps'

                // OR Option 3: Explicitly install specific versions (if you know compatible versions)
                // bat 'npm install cypress@13.6.4 cypress-image-snapshot@4.0.1'
            }
        }
        stage('Run Tests in Parallel') {
            steps {
                script {
                    def cypressEnv = [
                        "CYPRESS_RECORD_KEY=${env.CYPRESS_RECORD_KEY}"
                    ]
                    def parallelism = 3
                    def instances = []
                    def ciBuildId = UUID.randomUUID().toString() // Generate a unique build ID

                    for (int i = 1; i <= parallelism; i++) {
                        def instance = i
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
