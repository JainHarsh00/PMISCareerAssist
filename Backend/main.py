from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from pmis_recommender import extract_cv_text, recommend_internships
import os, tempfile
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB
mongoDb_url = os.getenv("MONGODB_URL")
client = MongoClient(mongoDb_url)
db = client["internshipData"]
internships_collection = db["internship"]

# Path to your React build
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

# Serve /assets/*
app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

# ---------------- API PART ----------------
def job_serializer(job) -> dict:
    return {
        "id": str(job["_id"]),
        "company_name": job["company_name"],
        "company_sector": job["company_sector"],
        "company_type": job["company_type"],
        "role_title": job["role_title"],
        "location": job["location"],
        "minimum_qualification": job["minimum_qualification"],
        "required_skills": job["required_skills"],
        "positions_available": job["positions_available"],
        "duration_months": job["duration_months"],
        "stipend_amount": job["stipend_amount"],
        "one_time_grant": job["one_time_grant"],
        "work_mode": job["work_mode"],
        "application_deadline": job["application_deadline"],
        "job_description": job["job_description"],
        "eligibility_criteria": job["eligibility_criteria"],
    }


@app.post("/recommend")
async def recommend(
    designation: str = Form(...),
    internship_type: str = Form(...),
    location: str = Form(...),
    duration: str = Form(...),
    skills: str = Form(""),  # new skills input
    cv: UploadFile = None,
):
    cv_text = ""
    if cv:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await cv.read())
            tmp_path = tmp.name
        cv_text = extract_cv_text(tmp_path) or ""
        os.remove(tmp_path)

    # Split skills input into list
    skills_list = [s.strip() for s in skills.replace("\n", ",").split(",") if s.strip()]

    student_profile = {
        'designation': designation,
        'internship_type': internship_type,
        'location': location,
        'duration': duration,
        'cv_text': cv_text,
    }

    recommendations = recommend_internships(student_profile, top_k=5)
    return recommendations


@app.get("/api/jobs")
def get_jobs():
    jobs = internships_collection.find()
    return [job_serializer(job) for job in jobs]


@app.get("/", response_class=FileResponse)
async def root():
    index_path = os.path.join(frontend_dist, "index.html")
    return FileResponse(index_path)  # ✅ need to return it


# Catch-all for React Router
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    index_path = os.path.join(frontend_dist, "index.html")
    return FileResponse(index_path)
