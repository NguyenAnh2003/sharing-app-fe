// get height to call move up button
import React from 'react';
import { useEffect } from 'react';

const useGetHeight = () => {

  useEffect(() => {
    window.addEventListener('scroll', () => {
      
    })

    return () => {
      window.removeEventListener('scroll')
    }
  }, []);
};

export default useGetHeight;
