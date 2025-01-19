import React from 'react';
import EmailForm from '../components/Marketing/marketing';

const Marketing: React.FC = () => {
  return <EmailForm onSendSuccess={() => console.log('Email sent successfully')} />;
};

export default Marketing;
