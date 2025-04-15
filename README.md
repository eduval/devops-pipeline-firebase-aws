# 🚀 DevOps Pipeline with Selenium: KelownaTrails Example

**Real-World Automation Testing with Jenkins, AWS & Firebase**  
This repository demonstrates a complete CI/CD pipeline using Jenkins installed natively on AWS EC2, Firebase Hosting, and Selenium-based UI tests written in Node.js.

---

## 🌐 Live Demo Application

The test application is deployed via Firebase Hosting:

👉 **KelownaTrails Web App**  
([Link to Kelowna Trails Web App](https://devops-assignmet-8-production.web.app/))

# AWS Jenkins Selenium Demo

This is a sample Node.js web application integrated with Firebase and tested using Selenium. It demonstrates CI/CD workflows using GitHub and Jenkins, with deployment flexibility on Firebase or AWS EC2. Ideal for DevOps experimentation and training.

## 🚀 Features

- Simple web app using Firebase Hosting
- Firebase Functions to handle backend logic
- Selenium tests to validate functionality
- Jenkins CI pipeline (using default plugins)
- Can be deployed on Firebase or any cloud-based EC2 instance (e.g., AWS)

---

## 🧰 Prerequisites

Before you begin, ensure the following tools are installed:

- Node.js (v18+)
- Firebase CLI
- Google Chrome (see below for installation)
- Git
- Jenkins (with **default plugins** only)

---

## 🛠 Project Overview

This example helps students understand:

- How to install and configure Jenkins on AWS EC2
- How to automate UI test cases with Selenium WebDriver in headless mode
- How to deploy frontend apps with Firebase
- How to conditionally trigger stages in a Jenkins pipeline based on test results

---

## 🔁 CI/CD Pipeline (Jenkinsfile)

Simplified flow of the Jenkins pipeline:

```bash
pipeline {
  agent any
  environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
  }

  stages {
    stage('Building') {
      steps {
        echo 'Building...'
      }
    }

    stage('Testing Environment') {
      steps {
        sh 'firebase deploy -P devops-assignmet-8-production --token "$FIREBASE_DEPLOY_TOKEN"'
        script {
          try {
            sh 'npm install selenium-webdriver'
            def output = sh(script: 'node test/test1.js', returnStdout: true).trim()
            echo "Test Output: ${output}"
            writeFile file: env.TEST_RESULT_FILE, text: output.contains('Test Success') ? 'true' : 'false'
          } catch (Exception e) {
            echo "Test failed: ${e.message}"
            writeFile file: env.TEST_RESULT_FILE, text: 'false'
          }
        }
      }
    }

    stage('Staging Environment') {
      when {
        expression { readFile(env.TEST_RESULT_FILE).trim() == 'true' }
      }
      steps {
        echo 'Staging...'
      }
    }

    stage('Production Environment') {
      when {
        expression { readFile(env.TEST_RESULT_FILE).trim() == 'true' }
      }
      steps {
        echo 'Production...'
      }
    }
  }
}
```
---

## 📦 Jenkins Controller Setup (AWS)
- Instance Type: t2.medium (2 vCPU, 4 GB RAM)
- AMI: Amazon Linux 2023
- Storage: 35 GB

---

## 🔧 Installation Steps
```bash
sudo dnf update -y
```
-	Updates all installed packages to the latest versions.
-	Improves security and compatibility.

# Install Node.js & Firebase CLI

```bash
sudo dnf install -y nodejs npm
sudo npm install -g firebase-tools --no-optional
```
- -g: global install so it's accessible from anywhere.
- --no-optional: avoids installing OS-specific optional dependencies (e.g., fsevents for macOS).

# Install Java and Git
```bash
sudo dnf install -y java-21-amazon-corretto git
```
- Jenkins is a Java-based application. Java 21 is supported and stable.
- Git is used to clone and pull code from GitHub.

# Install Jenkins
```bash
sudo dnf install -y wget
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io-2023.key
sudo dnf install -y jenkins
sudo systemctl enable --now jenkins
```
What each command does:
- wget downloads files (used to get the Jenkins repo config).
- Adds Jenkins repo so dnf can find the Jenkins package.
- Imports the GPG key to verify package integrity.
- Installs and starts the Jenkins service.


# Open Required Ports in EC2 Security Group
- Port 22 (SSH)
- Port 8080 (Jenkins)
- Access Jenkins
- Visit: http://<EC2_Public_IP>:8080

Unlock with:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Then install default plugins during setup.
Add a Secret Text Credential with ID firebase-token.

## 🖥️ Google Chrome Installation (RHEL/CentOS/Amazon Linux)

If you're using a RHEL-based system like Amazon Linux, install Google Chrome with:

```bash
sudo yum install -y wget
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
sudo yum -y localinstall google-chrome-stable_current_x86_64.rpm
```

## 🧰 Configure Disk and Swap Space
# ➕ Add 1 GB Swap File
```bash
sudo fallocate -l 1G /swapfile_extend_1GB
sudo chmod 600 /swapfile_extend_1GB
sudo mkswap /swapfile_extend_1GB
sudo swapon /swapfile_extend_1GB
```
- This adds virtual memory (swap) for when RAM is full.
- Prevents Jenkins crashes under heavy load.

# 📁 Extend /tmp Directory
```bash
sudo mount -o remount,size=5G /tmp/
```
- Jenkins and other tools use /tmp heavily.
- Resizing prevents failures during builds or installations.

---
## 🧪 Testing Notes

If you want to replicate the test:

- Replace `"firebase-token"` with your correct Firebase token in Jenkins credentials.
- You can use any other Firebase project — replace `"devops-assignmet-8-production"` in the `firebase deploy` command accordingly.
- Firebase offers a **free hosting plan** suitable for simple deployments.
- Alternatively, you can deploy this project to **any EC2 instance or cloud provider** if you prefer not to use Firebase.
---
## 📚 Learning Outcomes
Students will:

Set up Jenkins on AWS EC2

- Create and run automated Selenium tests in Node.js
- Use Firebase CLI for hosting deployment
- Trigger pipeline stages conditionally based on test results
- Learn basic CI/CD principles using Pipeline as Code
---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).

***

## ✨ Instructor Notes

This repository serves both as:
1. A learning tool
2. A template for students to expand on the topic

***

👨‍🏫 **Created by Washington**  
Instructor | Cisco ASC | DevOps & Automation Specialist  
📧 educristo@gmail.com  
🌐 [LinkedIn Profile](https://www.linkedin.com/in/washington-eduardo-valencia-1ab8aa189/)