# AI-Based Internship Recommendation Engine (PMIS)

## 📌 Overview
The **PM Internship Scheme (PMIS)** receives thousands of applications from students across India — including rural, tribal, and underserved communities. Many of these applicants are first-generation learners with little digital exposure. With hundreds of internships listed on the portal, it becomes challenging for them to identify opportunities that truly match their skills and aspirations.

This project develops an **AI-powered recommendation engine** that helps applicants get **personalized internship suggestions** based on their **skills, interests, educational background, and goals**.

---

Try : https://pmiscareerassist-production-5297.up.railway.app/search

---

## 🎯 Problem Statement
- Students face **information overload** due to hundreds of listings.  
- Many applicants lack prior internship experience or guidance.  
- Current listings are not **personalized** or easy to navigate.  
- Rural and first-gen learners struggle more with digital discovery of opportunities.  

---

## ✅ Solution
We propose an **AI Recommendation Engine** that:  
- Uses **Natural Language Processing (NLP)** and **Machine Learning** to map candidate skills with internship descriptions.  
- Provides **ranked internship suggestions** tailored to each applicant.  
- Features a **simple and user-friendly interface** accessible even for low-digital-literacy users.  
- Supports **multi-lingual recommendations** for inclusivity.  

---

## 🚀 Features
- **Profile-Based Matching** → Match internships with applicant profiles (skills, education, interests).  
- **Skill Gap Analysis** → Identify missing skills and suggest learning resources.  
- **Personalized Recommendations** → Ranked list of best-fit internships.  
- **Search & Filters** → Location, duration, stipend, and domain preferences.  
- **Inclusive Design** → Simple UI, language support, accessibility.  

---

## 🛠️ Tech Stack
- **Backend**: Python (FastAPI / Flask)  
- **NLP & ML**: Scikit-learn, Hugging Face Transformers, Sentence-BERT for embeddings  
- **Database**: MongoDB / PostgreSQL  
- **Frontend**: React.js (optional integration with PMIS portal)  
- **Deployment**: Docker, Railway/Render/Cloud service  

---

## 📊 Architecture
1. **Data Collection** → Internship listings + applicant data.  
2. **Preprocessing** → Clean, tokenize, and embed internship descriptions & profiles.  
3. **Similarity Engine** → TF-IDF / BERT embeddings + cosine similarity.  
4. **Ranking Model** → ML model to rank internships per user profile.  
5. **UI Layer** → Web-based dashboard for applicants.  

---

## 🌍 Impact
- Empowers students from **rural & underserved communities**.  
- Reduces **search time** for internships.  
- Provides **fair access** to opportunities through AI-driven guidance.  
- Enhances **internship-to-student matching efficiency** for PMIS.  

---

## 📌 Future Enhancements
- Chatbot assistant for internship discovery.  
- Integration with **career guidance tools**.  
- Recommendation explainability (why a student got a particular suggestion).  
- Multi-lingual voice-enabled search.  

---

## 👨‍💻 Contributors
- **Harsh Jain** – AI/ML Engineer, AIML B.Tech  
- Open for collaboration with other developers & researchers  
