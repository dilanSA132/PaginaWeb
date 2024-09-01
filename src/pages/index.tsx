import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Welcome to my Next.js App</h1>
        <p className="mt-4">This is the homepage.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
