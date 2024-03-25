import React from "react";

const MyLazyComponent = () => {
  return (
    <div>
      <h2>This is a lazy-loaded component!</h2>
      <p>Loaded at runtime only when needed.</p>
    </div>
  );
};

export default MyLazyComponent;
