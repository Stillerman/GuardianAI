from fastapi import FastAPI, File, UploadFile, HTTPException
from firebase_admin import credentials, initialize_app, firestore
import firebase_admin
import base64
from io import BytesIO
from datetime import datetime
import os
from typing import Dict, Any
from utils import analyse_image
import uuid

firebase_cred_file = '/Users/kshitijaggarwal/Documents/Projects/austin_llama_hackathon/guardianai-661ca-firebase-adminsdk-5dvb3-622505f98b.json'
env_path = '/Users/kshitijaggarwal/Documents/Projects/.env'

load_dotenv(env_path)

summary_prompt = """
Summarize this image. If it contains any text, return that too.
"""

harm_prompt = f"""
Please analyze this textual summary of an image for any content that could be harmful to a child.
Provide your assessment in the following JSON format:

{{
    "answer": string,        // "yes" or "no"
    "risk": string,         // "none" | "low" | "medium" | "high" | "critical"
    "type": string[],       // Array of identified risk types
}}

Risk Types:
- "explicit_content": Nudity, sexual content
- "violence": Physical harm, weapons, gore
- "substance_abuse": Drugs, alcohol, smoking
- "hate_speech": Discriminatory or extremist content
- "grooming": Predatory behavior patterns
- "self_harm": Content promoting harmful behaviors
- "toxic_behavior": Bullying, harassment
- "dangerous_activities": Unsafe practices
- "psychological_distress": Frightening or traumatic content
- "misinformation": Deliberately misleading content

Example Response:
{{
    "answer": "yes",
    "risk": "high",
    "type": ["violence", "psychological_distress"],
    "explaination": "The image contains a man hurting an animal." 
}}

It is possible to not have anything harmful in the text. 
Return the JSON and nothing else. 
"""

# Initialize FastAPI app
app = FastAPI()

# Initialize Firebase
# Replace 'path/to/your/firebase-credentials.json' with your actual credentials file path
cred = credentials.Certificate(firebase_cred_file)
firebase_app = initialize_app(cred)
db = firestore.client()

def image_to_base64(image_data: bytes) -> str:
    """Convert image bytes to base64 string"""
    return base64.b64encode(image_data).decode('utf-8')

def map_risk_type(risk_types: list) -> str:
    """Map the risk types to a single primary type"""
    # Define priority order for risk types
    type_priority = {
        "explicit_content": "Explicit Content",
        "violence": "Violence",
        "substance_abuse": "Substance Abuse",
        "hate_speech": "Hate Speech",
        "grooming": "Grooming",
        "self_harm": "Self Harm",
        "toxic_behavior": "Cyberbullying",
        "dangerous_activities": "Dangerous Activities",
        "psychological_distress": "Psychological Distress",
        "misinformation": "Misinformation"
    }
    
    # Return the first matching type based on priority
    res_type = []
    for risk_type in risk_types:
        if risk_type in type_priority:
            res_type.append(type_priority[risk_type])
        else:
            res_type.append("Other")
    return res_type # return the whole list or the first element?

def format_timestamp() -> str:
    """Return the current timestamp as a string"""
    current_time = datetime.now()
    return current_time.strftime("%Y-%m-%d %H:%M:%S")

async def save_to_firebase(analysis_result: Dict[str, Any], summary, image_base64: str) -> str:
    """
    Save analysis results and image to Firebase
    Returns the document ID
    """
    
    doc_id = str(uuid.uuid4())[:8]
    
    # Format the data according to the required structure
    data = {
        "id": doc_id,
        "type": map_risk_type(analysis_result.get("type", [])),
        "riskLevel": analysis_result.get("risk", "None"),
        "timestamp": format_timestamp(),
        "platform": analysis_result.get("platform", "None"),  # or you could make this configurable
        "description": summary,
        "aiExplanation": analysis_result.get("explaination", "No detailed explanation provided"),
    }
    
    # Add to Firestore
    doc_ref = db.collection('alerts').document(doc_id)
    doc_ref.set(data)
    
    return doc_id

@app.post("/analyze-screenshot/")
async def analyze_screenshot(file: UploadFile = File(...)):
    """ 
    Endpoint to receive a screenshot, analyze it, and save results to Firebase
    """
    try:
        # Read the image file
        contents = await file.read()
        
        # Convert to base64
        base64_image = image_to_base64(contents)
        
        # Analyze image using your existing function
        summary, analysis_result = analyse_image(
            base64_image,
            summary_prompt,
            harm_prompt,
            summary_llm='llama-3.2-90b-vision-preview',
            harm_llm='llama-3.1-8b-instant'
        )
        
        # Save to Firebase
        doc_id = await save_to_firebase(analysis_result, summary, base64_image)
        
        # Return the results and Firebase document ID
        return {
            "status": "success",
            "firebase_doc_id": doc_id,
            "analysis_result": analysis_result
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )

# Example of how to run the server
if __name__ == "__main__":
    import uvicorn
    
    # Load environment variables if needed
    from dotenv import load_dotenv
    env_path = '/Users/kshitijaggarwal/Documents/Projects/.env'
    load_dotenv(env_path)
    
    # Run the server
    uvicorn.run(app, host="0.0.0.0", port=8000)