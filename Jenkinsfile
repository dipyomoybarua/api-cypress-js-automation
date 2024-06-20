pipeline {
    agent any

    environment {
        // Define placeholders for credentials here
        CYPRESS_RECORD_KEY = ''
        CYPRESS_PROJECT_ID = ''
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/dipyomoybarua/api-cypress-js-automation'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install --force cypress-image-snapshot@4.0.1 cypress@13.6.4 @shelex/cypress-allure-plugin'
            }
        }
        stage('Run Tests in Parallel') {
            steps {
                script {
                    // Use withCredentials to retrieve and mask credentials..
                    withCredentials([string(credentialsId: 'cypress-record-key', variable: 'CYPRESS_RECORD_KEY'),
                                     string(credentialsId: 'cypress-project-id', variable: 'CYPRESS_PROJECT_ID')]) {
                        def parallelism = 3
                        def instances = [:]
                        def ciBuildId = UUID.randomUUID().toString()

                        for (int i = 1; i <= parallelism; i++) {
                            def instance = i
                            instances["Cypress Instance ${instance}"] = {
                                withEnv(["CYPRESS_CI_BUILD_ID=${ciBuildId}"]) {
                                    bat "npx cypress run --record --parallel --group ${instance} --ci-build-id ${ciBuildId}"
                                }
                            }
                        }
                        parallel instances
                    }
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
