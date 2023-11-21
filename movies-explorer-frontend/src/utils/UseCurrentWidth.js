import React, { useState, useEffect} from 'react';

const useCurrentWidth = (moviesCardListRef) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
      let timeoutId = null;
  
      setWidth(moviesCardListRef.current?.clientWidth);

      const resizeListener = () => {
        clearTimeout(timeoutId);
    
        timeoutId = setTimeout(() => setWidth(moviesCardListRef.current?.clientWidth), 150);
      };
    
      window.addEventListener('resize', resizeListener);
    
      return () => {
        window.removeEventListener('resize', resizeListener);
      };
  }, [moviesCardListRef.current]);

  return { width };
}

export default useCurrentWidth;