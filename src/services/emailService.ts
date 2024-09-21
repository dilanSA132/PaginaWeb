export const sendEmail = async (subject: string, html: string, recipientEmail: string) => {
    const response = await fetch('http://localhost:3000/api/v1/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, html, recipientEmail }),  // Incluimos el destinatario y el HTML
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Error enviando correo');
    }
  
    return response.json(); // Retorna la respuesta del servidor
  };
  