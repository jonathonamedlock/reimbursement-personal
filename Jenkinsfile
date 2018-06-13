pipeline {
    agent {
        node {
            label 'master'
        }
    }
    
    environment {
        REIMBURSEMENT_REGION="${REIMBURSEMENT_REGION}"
        AWS_ACCESS_KEY_ID= "${AWS_ACCESS_KEY_ID}"
        AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"
        REIMBURSEMENT_BUCKET="${BUCKET_NAME}"
    }
    
    stages {
        stage('Preparation') { // for display purposes
            steps {
              // clean the workspace
              cleanWs()
            }
        }

       stage('Download') {
           steps {
              // Download code from a GitHub repository
              git 'https://github.com/jonathonamedlock/reimbursement-personal'
           }
        }

        // stage('NPM Install') {
        //     steps {
        //         // go into client-side directory
        //         dir('week4') {
        //             dir('redux-demo') {
        //                 // install node modules
        //                 sh 'npm install'
        //             }
        //         }
        //     }
        // }
        
        // stage('NPM Build') {
        //     steps {
        //         // go into client-side directory
        //         dir('week4') {
        //             dir('redux-demo') {
        //                 // install node modules
        //                 sh 'npm run build'
        //             }
        //         }
        //     }
        // }

        stage('Deploy') {
            steps {
                dir('reimbursement-service') {
                    dir('frontend') {
                        // Deploy the application
                         s3Upload(bucket:"${REIMBURSEMENT_BUCKET}", path:'', file: 'build/')
                    }
                }
            }
        }

    }
    
    post {
        always {
            sh "echo 'i always run'"
            
            /* SLACK message example
            
            slackSend channel: '#some-channel',
                color: 'good',
                message: "The Janus server has attempted a build"
                
            */
        }
        
        success {
            sh "echo 'i only run on success'"
        }
        
        unstable {
            sh "echo 'i run when the build is unstable (testing?)'"
        }
        
        failure {
            sh "echo 'i run when things failed'"
        }
        
        changed {
            sh "echo 'i run when there is a successful build after a failed one'"
            sh "echo 'or a failed build after a successful one'"
        }
    }
}
