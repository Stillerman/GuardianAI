from postmarker.core import PostmarkClient
from typing import List, Optional
import os

def send_email(
    to_email: str,
    subject: str,
    html_content: str,
    from_email: Optional[str] = None,
    cc: Optional[List[str]] = None,
    bcc: Optional[List[str]] = None,
    reply_to: Optional[str] = None,
    track_opens: bool = True,
) -> dict:
    """
    Send an email using the Postmark API.
    
    Args:
        to_email (str): Recipient email address
        subject (str): Email subject
        html_content (str): HTML content of the email
        from_email (str, optional): Sender email address. Defaults to env variable.
        cc (List[str], optional): List of CC recipients
        bcc (List[str], optional): List of BCC recipients
        reply_to (str, optional): Reply-to email address
        track_opens (bool): Whether to track email opens. Defaults to True.
    
    Returns:
        dict: Response from Postmark API
    
    Raises:
        Exception: If POSTMARK_API_TOKEN is not set or if the API call fails
    """
    # Get API token from environment variable
    api_token = os.getenv('POSTMARK_API_TOKEN')
    if not api_token:
        raise Exception("POSTMARK_API_TOKEN environment variable is not set")
    
    # Initialize Postmark client
    postmark = PostmarkClient(server_token=api_token)
    
    # Use default from_email if not provided
    if not from_email:
        from_email = os.getenv('DEFAULT_FROM_EMAIL', 'no-reply@yourdomain.com')
    
    # Prepare email payload
    email_data = {
        "From": from_email,
        "To": to_email,
        "Subject": subject,
        "HtmlBody": html_content,
        "TrackOpens": track_opens,
    }
    
    # Add optional parameters if provided
    if cc:
        email_data["Cc"] = ",".join(cc)
    if bcc:
        email_data["Bcc"] = ",".join(bcc)
    if reply_to:
        email_data["ReplyTo"] = reply_to
    
    # Send email
    try:
        response = postmark.emails.send(**email_data)
        return response
    except Exception as e:
        raise Exception(f"Failed to send email: {str(e)}")

# Example usage
if __name__ == "__main__":
    # Example HTML content
    html_content = """
    <html>
        <body>
            <h1>Hello!</h1>
            <p>This is a test email sent using Postmark.</p>
        </body>
    </html>
    """
    
    try:
        response = send_email(
            to_email="jason@fluencyai.net",
            from_email="jason@fluencyai.net",
            subject="Test Email",
            html_content=html_content,
            reply_to="jason@fluencyai.net"
        )
        print("Email sent successfully:", response)
    except Exception as e:
        print("Error:", str(e))

