'use client'
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
  
  const LoadingPage = () => {
 
    const [showOptions, setShowOptions] = useState(false);

    setTimeout(() => {
      setShowOptions(true);
    }, 1000);
  
    return (
        <div className="flex justify-center items-center h-screen">
          <Transition
            show={!showOptions}
            enter="transform transition duration-500 ease-in"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transform transition duration-500 ease-out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
          >
            <h1 className="text-6xl transition-opacity duration-500">Farmer Joe</h1>
          </Transition>
        
        <Transition
          show={showOptions}
          enter="transition-opacity duration-500 ease-in"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        > 
        <h1 className="text-5xl transition-opacity duration-500 font-bold">Farmer Joe</h1>
          <div className="mt-6">
            <ul className="text-center space-y-2">
              <li className="hover:text-red-600 hover:font-bold"><Link href="/game">Start New Game</Link></li>
              <li className="hover:text-red-600 hover:font-bold"><Link href="/">Options</Link></li>
            </ul>
          </div>
        </Transition>
      </div>
    );
  };
  
  export default LoadingPage;