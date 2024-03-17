'use client'

import { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';

const LoadingPage = () => {
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the starting screen after loading
      Router.push('/start');
    }, 5000); // Adjust the time as needed

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <Head>
        <title>Farmer Joe - Loading</title>
      </Head>
      <h1 className="text-3xl">Loading Farmer Joe...</h1>
      {/* Add background music */}
      <audio autoPlay loop>
        <source src="/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default LoadingPage;
