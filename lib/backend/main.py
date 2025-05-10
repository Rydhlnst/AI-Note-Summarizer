from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan specific origin untuk production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PDF Parsing Endpoint
@app.post("/parse-pdf/")
async def parse_pdf_endpoint(file: UploadFile = File(...)):
    if not file:
        return {"success": False, "error": "No file received."}

    try:
        content = await file.read()
        doc = fitz.open(stream=content, filetype="pdf")
        text = ""

        for page in doc:
            page_text = page.get_text()
            text += page_text

        # Jika text kosong, tetap return success tapi data kosong
        return {"success": True, "data": text or "No content extracted."}
    except Exception as e:
        return {"success": False, "error": str(e)}


# DOCX Parsing (Jika Dibutuhkan)
from docx import Document
import io

@app.post("/parse-docx/")
async def parse_docx_endpoint(file: UploadFile = File(...)):
    if not file:
        return {"success": False, "error": "No file received."}

    try:
        content = await file.read()
        doc = Document(io.BytesIO(content))
        text = ""

        for para in doc.paragraphs:
            text += para.text + "\n"

        return {"success": True, "data": text or "No content extracted."}
    except Exception as e:
        return {"success": False, "error": str(e)}
