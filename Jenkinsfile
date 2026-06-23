pipeline {
    agent any

    options {
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Inizializzazione') {
            steps {
                echo '=== Inizializzazione della Pipeline Totem ==='
                sh 'docker version'
            }
        }

        stage('Installazione e Build') {
            steps {
                echo '=== Installazione dipendenze e compilazione (Vite) ==='
                sh "docker run --rm -v bcc_jenkins_data:/var/jenkins_home -w \"${WORKSPACE}\" node:22-alpine sh -c 'corepack enable && pnpm install --frozen-lockfile && pnpm run build'"
            }
        }
    }

    post {
        success { echo '=== Totem: pipeline completata con successo! ===' }
        failure { echo '=== Totem: errore durante la pipeline ===' }
    }
}
