from groq import Groq
import base64
import os 
import json

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def run_llm(prompt, base64_image, model, return_json=False):
    """
    Run the Groq API to get a completion for the given prompt and image.

    Args:
        prompt (str): The prompt to run.
        base64_image (str): The base64 encoded image to process.
        model (str): The model to use.
        return_json (bool): If True, return the response as a JSON object.
                           If False, return the response as text.

    Returns:
        str or dict: The response from the Groq API.
    """
    if return_json:
        response_format = {"type": "json_object"}
    else:
        response_format = {"type": "text"}

    client = Groq(api_key=os.environ["GROQ_API_KEY"])
    
    content = [{"type": "text",
                "text": f"{prompt}"
                }]

    if base64_image is not None:
        # Add the image to the content
        content.append({
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",                    }
                    })

    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": content
            }
        ],
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
        response_format=response_format
    )

    if return_json:
        return json.loads(completion.choices[0].message.content)
    else:
        return completion.choices[0].message.content

def analyse_image(image, summary_prompt, harm_prompt, 
                  summary_llm='llama-3.2-90b-vision-preview', 
                  harm_llm='llama-3.1-8b-instant'):
    """
    Analyze an image for harmful content.

    The function takes an image path or a base64 encoded image, 
    a summary prompt and a harmful content prompt as input.
    It uses the Groq API to generate a summary of the image, 
    and then checks the summary for harmful content using the 
    Groq API again.

    Args:
        image: str or bytes, path to the image or the base64 encoded image
        summary_prompt: str, the prompt to use for generating the summary
        harm_prompt: str, the prompt to use for checking harmful content
        summary_llm: str, the language model to use for generating the summary
        harm_llm: str, the language model to use for checking harmful content
    Returns:
        dict, the response from the Groq API
    """
    # check if it is an image path or a base64 image 
    if os.path.isfile(image):
        # if it is a file path, encode the image
        base64_image = encode_image(image)
    else:
        # if it is not a string, assume it is a base64 encoded image
        base64_image = image

    # Summarize Image 
    summary = run_llm(summary_prompt, 
                       base64_image, 
                       model=summary_llm,
                       return_json=False)

    # Check harmful content in summary 
    prompt = harm_prompt + "#### Text\n" + summary
    harm_response = run_llm(prompt, 
                      base64_image=None, 
                      model=harm_llm,
                      return_json=True)

    return summary, harm_response
