// src/services/emailService.ts

export async function getEmails() {
  const response = await fetch('http://localhost:3000/api/v1/email');
  if (!response.ok) {
      throw new Error('Error al obtener los correos');
  }
  return await response.json();
}

export async function createEmail(data: { email: string, subject: string, type: string, content: string }) {
  const response = await fetch('http://localhost:3000/api/v1/email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Error al crear el correo');
  }

  return await response.json();
}

export async function updateEmail(id: number, data: { email: string, subject: string, type: string, content: string }) {
  const response = await fetch(`http://localhost:3000/api/v1/email/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Error al actualizar el correo');
  }

  return await response.json();
}

export async function deleteEmail(id: number) {
  const response = await fetch(`http://localhost:3000/api/v1/email/${id}`, {
      method: 'DELETE',
  });

  if (!response.ok) {
      throw new Error('Error al eliminar el correo');
  }

  return await response.json();
}
