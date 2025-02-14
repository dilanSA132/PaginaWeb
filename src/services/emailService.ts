import cron from 'node-cron';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const sendEmail = async (subject: string, html: string, recipientEmail: string) => {
  const response = await fetch(`${API_BASE_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, html, recipientEmail }),  
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.log(errorResponse); 
    throw new Error(errorResponse.message || 'Error enviando correo');
  }

  return response.json(); 
};


