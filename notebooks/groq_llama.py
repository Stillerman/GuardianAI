# %% 

from groq import Groq
import base64
import os 
from dotenv import load_dotenv
import pyautogui
from io import BytesIO

env_path = '/Users/jts/.openai'

load_dotenv(env_path)

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def run_llm(prompt, base64_image, model="llama-3.2-11b-vision-preview"):
    client = Groq(api_key=os.environ["GROQ_API_KEY"])
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"{prompt}"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",                    }
                    }
                ]
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
        response_format={"type": "json_object"},
    )

    return completion.choices[0].message.content

def take_screenshot(filename):
    # Take screenshot
    screenshot = pyautogui.screenshot()
    
    # Resize the image
    desired_size = (400, 300)
    resized_screenshot = screenshot.resize(desired_size)
    
    # Convert to RGB mode
    rgb_screenshot = resized_screenshot.convert('RGB')
    
    # Create a BytesIO object to store the image in memory
    buffer = BytesIO()
    
    # Save the image to the buffer in JPEG format with compression
    rgb_screenshot.save(buffer, format='JPEG', quality=50)
    
    # Get the bytes from the buffer and encode to base64
    base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    # Save the image to a file
    with open(filename, 'wb') as file:
        file.write(base64.b64decode(base64_image))
    
    # Close the buffer
    buffer.close()
    
    return base64_image


prompt = f"""
Please analyze this image for any content that could be harmful to children.

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
    "explaination": "The image contains violence and psychological distress." 
}}

Please ensure comprehensive analysis while maintaining a clear, objective assessment.
"""

# %% 
import time

for i in range(10):
    base64_image = take_screenshot(f"./data/screenshot_{i}.jpg")
    response = run_llm(prompt, base64_image)
    print(response)
    time.sleep(1)

# %% 