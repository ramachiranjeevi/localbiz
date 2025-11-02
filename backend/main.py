from fastapi import FastAPI
from pydantic import BaseModel
import os
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("Set OPENAI_API_KEY env var")

client = OpenAI(api_key=OPENAI_API_KEY)

class Prompt(BaseModel):
    business: str
    contentType: str
    tone: str
    language: str
    details: str
    lengthPref: str

@app.post("/api/generate")
async def generate(data: Prompt):
    prompt = f"""You are a helpful marketing writer for local businesses in India.
Business: {data.business}
Content type: {data.contentType}
Tone: {data.tone}
Language: {data.language}
Length: {data.lengthPref}
Details: {data.details}

Output structure:
- Title (one line)
- Caption / Body
- Call to Action (short)
- 8 relevant hashtags (comma separated)

Respond only with the structured output.
"""
    resp = client.chat.completions.create(
        model=os.getenv("OPENAI_MODEL","gpt-4o-mini"),
        messages=[{"role":"user","content": prompt}],
        max_tokens=int(os.getenv("MAX_TOKENS","600")),
        temperature=0.7,
    )
    return {"output": resp.choices[0].message["content"]}