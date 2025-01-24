


import React from 'react';
import dynamic from 'next/dynamic';

// Cargar EmailForm dinámicamente para evitar el error de 'document' en el servidor
const EmailForm = dynamic(() => import('../components/Marketing/marketing'), { ssr: false });

const Marketing: React.FC = () => {
  return <EmailForm onSendSuccess={() => console.log('Email sent successfully')} />;
};

export default Marketing;
