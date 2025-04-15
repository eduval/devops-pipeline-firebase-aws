pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
    }

 stages{
        stage('Building'){
            steps{
                echo 'Biulding...'
            }
        } 
        stage('Testing Environment'){
            steps{
             sh 'firebase deploy -P devops-assignmet-8-production --token "$FIREBASE_DEPLOY_TOKEN"'
              script{
                try{
                    //Install Selenium webdriver
                    sh 'npm install selenium-webdriver'
                    
                    //Run the test and capture the output
                    def output = sh(script: 'node test/test1.js', returnStdout: true).trim()

                    //Debugging printing the output
                    echo "Test Output: ${output}"

                    //Write the result to a file

                    if(output.contains('Test Success')){
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    }else{
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }catch (Exception e) {
                    echo "Test failed: ${e.message}"
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                }
            }
             }
        } 
        stage('Staging Environment'){
             when{
               expression {
                 // Read the test result from the file id true continue
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
            steps{
             echo 'Staging...'
            }
        } 
        stage('Production Environment'){
             when{
               expression {
                 // Read the test result from the file id true continue
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
            steps{
            echo 'Production...'
            }
        } 
    }

}
