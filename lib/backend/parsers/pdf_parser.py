import fitz  # PyMuPDF

def parse_pdf(content: bytes) -> str:
    with fitz.open(stream=content, filetype="pdf") as pdf:
        text = ""
        for page in pdf:
            text += page.get_text()
    return text