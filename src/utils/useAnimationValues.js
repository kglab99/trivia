import { useState, useEffect } from 'react';

Gitarka

const useAnimationValues = () => {
  const [animationValues, setAnimationValues] = useState({
    initialX: 1000,
    exitX: -1000,
  });

  useEffect(() => {
    const updateAnimationValues = () => {
      if (window.innerWidth <= 600) { // Mobile width threshold
        setAnimationValues({ initialX: 500, exitX: -500 });
      } else {
        setAnimationValues({ initialX: 1000, exitX: -1000 });
      }
    };

    updateAnimationValues();
    window.addEventListener("resize", updateAnimationValues);

    return () => window.removeEventListener("resize", updateAnimationValues);
  }, []);

  return animationValues;
};

export default useAnimationValues;
