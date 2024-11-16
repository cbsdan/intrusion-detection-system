import React, { useEffect } from 'react';

const LoadFoot = () => {
  useEffect(() => {
    const myVar = setTimeout(() => {
      // document.getElementById("loader").style.display = "none";
      // document.getElementById("myDiv").style.display = "block";
    }, 200);

    return () => clearTimeout(myVar); 
  }, []);

  return null;
};

export default LoadFoot;
