
from fastapi import FastAPI
from pydantic import BaseModel
import os
from openai import OpenAI

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(data: Prompt):
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content": data.prompt}],
        max_tokens=400
    )
    return {"output": resp.choices[0].message["content"]}
