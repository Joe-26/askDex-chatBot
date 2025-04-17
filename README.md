# 🚀 AskDex – Your Policy-Aware AI Companion

AskDex is a secure, Retrieval-Augmented Generation (RAG) chatbot designed to help employees interact with internal policy documents—like privacy statements, health insurance policies, and compliance protocols—without the worry of data leakage or AI hallucinations.

## 📌 Project Objective

The core goal of AskDex is to provide an intuitive and trustworthy interface for users to ask questions about uploaded documents. It ensures responses are grounded *only* in the uploaded content, with no generalized or hallucinated feedback — making it ideal for enterprise use cases.

## 🔧 Tech Stack

### 🖥️ Frontend
- **React**
- **TailwindCSS**
- **JavaScript**

### 🛠️ Backend
- **Java**
- **Spring Boot**
- **OpenAI GPT APIs**

## 🧠 Features

- 📄 **Document Upload**: Accepts plain text documents (e.g., `.txt` format) containing policy content.
- 🔍 **RAG-Powered QA**: Users ask questions; answers are sourced *directly* from the uploaded document.
- 🛡️ **Privacy-Focused**: Designed for on-premise deployment to avoid external API data leaks.
- ✅ **Zero Hallucination Policy**: No guessing — if it's not in the document, it's not in the answer.

## 🎯 Use Case Scenarios

- **Enterprise IT & HR Departments**: Quick access to company policy documents.
- **Insurance Providers**: Instant clarification on benefits, coverage, exclusions.
- **Privacy & Compliance Teams**: Easier navigation of data protection and legal policies.

## 🚀 Getting Started

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/askdex.git
cd askdex
```

#### 2. Clone the Repository
```bash
cd frontend
npm install
npm start
```

#### 3. Clone the Repository
```bash
cd backend
./mvnw spring-boot:run
```
⚠️ Note: Make sure to set your OpenAI API key in askdex_spring/src/main/resources/application.properties
```
spring.ai.openai.api-key=YOUR_OPENAI_API_KEY
```

## 📬 Contact
If you’re interested in collaborating or have feedback on this project, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/josephraj-velpula/).
