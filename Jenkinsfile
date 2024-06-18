pipeline {
    agent any

    environment {
        CYPRESS_RECORD_KEY = credentials('8212dd2f-1031-4d21-9883-c00f65004442')
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/dipyomoybarua/api-cypress-js-automation'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'rmdir /s /q node_modules || exit 0'  // Clean node_modules if exists
                    bat 'npm cache clean --force'             // Clean npm cache
                    bat 'npm install --force cypress-image-snapshot@4.0.1 cypress@13.6.4' // Install dependencies
                }
            }
        }
        
        stage('Run Tests in Parallel') {
            steps {
                script {
                    def parallelism = 3
                    def instances = [:]
                    def ciBuildId = UUID.randomUUID().toString()

                    for (int i = 1; i <= parallelism; i++) {
                        def instance = i
                        instances["Cypress Instance ${instance}"] = {
                            def cypressEnv = [
                                CYPRESS_RECORD_KEY: "${env.CYPRESS_RECORD_KEY}",
                                CYPRESS_CI_BUILD_ID: ciBuildId
                            ]
                            bat "npx cypress run --record --parallel --group ${instance} --ci-build-id ${ciBuildId}"
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
