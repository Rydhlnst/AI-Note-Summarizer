import docx

def parse_docx(file_stream) -> str:
    document = docx.Document(file_stream)
    return "\n".join([para.text for para in document.paragraphs])