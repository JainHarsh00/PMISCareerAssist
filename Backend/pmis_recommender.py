from fastapi import FastAPI, UploadFile, Form
from pymongo import MongoClient
from langchain_community.document_loaders import PyPDFLoader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import tempfile
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# MongoDB connection
mongoDb_url = os.getenv("MONGODB_URL")
client = MongoClient(mongoDb_url)
db = client["internshipData"]
internships_collection = db["internship"]

def extract_cv_text(cv_path: str) -> str:
    """Extracts text from CV using PyPDFLoader."""
    loader = PyPDFLoader(cv_path)
    pages = loader.load()
    return " ".join([page.page_content for page in pages])

def recommend_internships(student_profile: str, top_k: int = 5):
    """Finds top internship matches based on cosine similarity."""
    internships = list(internships_collection.find({}, {"_id": 0}))
    internship_texts = [
        internship["job_description"] + " " + internship.get("eligibility_criteria", "")
        for internship in internships
    ]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(internship_texts + [student_profile])

    similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    ranked_indices = similarities.argsort()[::-1][:top_k]

    recommendations = []
    for idx in ranked_indices:
        rec = internships[idx].copy()
        rec["similarity"] = round(float(similarities[idx]), 3)
        recommendations.append(rec)
    return recommendations

if __name__ == "__main__":
    print("=== Student Internship Input ===")
    designation = input("Enter preferred designation: ")
    duration = input("Enter duration (in months): ")
    work_type = input("Enter work mode (On-site/Online): ")
    stipend_pref = input("Enter stipend preference (Paid/Unpaid): ")
    location = input("Enter preferred location: ")
    cv_path = input("Enter path to your CV (PDF): ")

    # Extract CV text
    cv_text = extract_cv_text(cv_path)

    # Build student profile text
    student_profile = f"{designation} {duration} {work_type} {stipend_pref} {location} {cv_text}"

    # Get top 5 recommendations
    recommendations = recommend_internships(student_profile)

    print("\n=== Top Internship Recommendations ===")
    for i, rec in enumerate(recommendations, 1):
        print(f"\n{i}. {rec['role_title']} at {rec['company_name']}")
        print(f"   Location: {rec['location']}, Duration: {rec['duration_months']} months")
        print(f"   Stipend: {rec['stipend_amount']}, Mode: {rec['work_mode']}")
        print(f"   Similarity Score: {rec['similarity']}")