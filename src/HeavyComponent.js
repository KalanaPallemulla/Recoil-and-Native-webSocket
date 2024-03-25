// HeavyComponent.js
import React, { useState, useEffect } from "react";

const HeavyComponent = () => {
  const [factorial, setFactorial] = useState(null);

  useEffect(() => {
    // Simulate heavy computation asynchronously
    const calculateFactorialAsync = async (num) => {
      let result = 1;
      for (let i = 1; i <= num; i++) {
        result *= i;
        setFactorial(result);
      }
    };

    calculateFactorialAsync(100000);
  }, []);
  console.count("HeavyComponent");
  return (
    <div>
      <h2>Heavy Component</h2>
      {factorial !== null ? (
        <p>Factorial of 1,000,000,000,000: {factorial}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HeavyComponent;
