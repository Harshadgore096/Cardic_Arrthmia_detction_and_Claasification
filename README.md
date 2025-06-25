// Cardiac Arrhythmia Detection and Classification System

// ✅ Tech Stack:
// - Frontend: Next.js with Tailwind CSS (inline)
// - Backend: Node.js + Express.js
// - Database: MongoDB with Mongoose
// - ML Model: TensorFlow (Python) served via Flask API

// This codebase consists of:
// 1. Next.js frontend for UI
// 2. Express backend for patient data management
// 3. Python TensorFlow server for predictions

// Note: Full code implementation is not provided as per request. This README is structured for GitHub.

/* ========================== */

# Cardiac Arrhythmia Detection and Classification

This web application detects and classifies cardiac arrhythmias using a trained machine learning model. Built using the MERN stack + TensorFlow, it offers real-time patient data management and diagnostic insights.

## 🏗️ Project Structure

```
root/
├── frontend/         # Next.js + Tailwind CSS
├── backend/          # Node.js + Express + Mongoose
├── ml_model/         # TensorFlow Flask server
└── README.md
```

## ✨ Features
- Upload ECG data for classification
- Visual ECG signal representation (Chart.js)
- RESTful API to retrieve patient history
- Secure backend to store and fetch data
- TensorFlow ML model for arrhythmia classification

## 📦 Technologies
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB using Mongoose
- **Machine Learning**: Python, TensorFlow, Flask

## 📁 Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node index.js
```

### ML Model
```bash
cd ml_model
pip install -r requirements.txt
python app.py
```

## 🧠 Machine Learning Model
- Trained on the MIT-BIH Arrhythmia Dataset
- Uses CNN/LSTM architecture for sequence classification
- Returns prediction confidence & class

## ⚙️ API Endpoints
### Backend
- `POST /api/patient` – Add new patient record
- `GET /api/patient/:id` – Get patient data

### ML Server
- `POST /predict` – Send ECG data, receive arrhythmia class

## 💾 Data Storage
- MongoDB stores all patient records including ECG results and timestamps

## 📊 Visualizations
- ECG signals and predictions are shown in the browser via Chart.js

## 🛡️ Security
- Basic validation on all endpoints
- CORS + sanitization + helmet for safety



> Built with ❤️ by Harshad Gore
