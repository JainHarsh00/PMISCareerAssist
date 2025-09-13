from fastapi import FastAPI, UploadFile, Form
from pymongo import MongoClient
from langchain_community.document_loaders import PyPDFLoader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import tempfile
import os
import re
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

# MongoDB connection
mongoDb_url = os.getenv("MONGODB_URL")
client = MongoClient(mongoDb_url)
db = client["internshipData"]
internships_collection = db["internship"]

# --- Utility function ---
def normalize_text(text: str) -> str:
    """Lowercase, strip, and normalize whitespace for TF-IDF."""
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_cv_text(cv_path: str) -> str:
    """Extracts text from CV using PyPDFLoader."""
    loader = PyPDFLoader(cv_path)
    pages = loader.load()
    return " ".join([page.page_content for page in pages])

# --- Main recommendation function ---
def recommend_internships(student_profile: dict, top_k: int = 5, weights: dict = None):
    if weights is None:
        weights = {'key_fields': 0.7, 'cv_text': 0.3}

    # Fetch internships from MongoDB
    internships = list(internships_collection.find({}, {"_id": 0}))

    # Normalize internship job descriptions
    internship_job_descriptions = [
        normalize_text(internship["job_description"]) for internship in internships
    ]

    # Prepare student key profile (designation, type, location, duration, skills)
    student_key_profile = normalize_text(
        f"{student_profile.get('designation', '')} "
        f"{student_profile.get('internship_type', '')} "
        f"{student_profile.get('location', '')} "
        f"{student_profile.get('duration', '')} "
    )

    # Prepare internship eligibility and required skills
    internship_eligibility_and_skills = [
        normalize_text(
            internship.get("eligibility_criteria", "") + " " + " ".join(internship.get("required_skills", []))
        )
        for internship in internships
    ]

    # --- Step 1: Calculate similarity for the key fields ---
    key_vectorizer = TfidfVectorizer()
    key_tfidf_matrix = key_vectorizer.fit_transform(internship_eligibility_and_skills + [student_key_profile])
    key_similarities = cosine_similarity(key_tfidf_matrix[-1], key_tfidf_matrix[:-1]).flatten()

    # --- Step 2: Calculate similarity for CV text ---
    cv_text_normalized = normalize_text(student_profile.get('cv_text', ''))
    cv_vectorizer = TfidfVectorizer()
    cv_tfidf_matrix = cv_vectorizer.fit_transform(internship_job_descriptions + [cv_text_normalized])
    cv_similarities = cosine_similarity(cv_tfidf_matrix[-1], cv_tfidf_matrix[:-1]).flatten()

    # --- Step 3: Combine weighted similarity ---
    if len(key_similarities) != len(cv_similarities):
        print("Error: Similarity arrays have different lengths.")
        return []

    weighted_similarities = (key_similarities * weights['key_fields']) + (cv_similarities * weights['cv_text'])

    # --- Step 4: Rank internships and prepare recommendations ---
    ranked_indices = weighted_similarities.argsort()[::-1][:top_k]

    recommendations = []
    for idx in ranked_indices:
        rec = internships[idx].copy()
        rec["similarity"] = round(float(weighted_similarities[idx]), 3)
        recommendations.append(rec)

    return recommendations