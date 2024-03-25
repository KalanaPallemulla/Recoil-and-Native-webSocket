import React, { Suspense } from "react";
import "./App.css";
import AnotherComponent from "./AnotherComponent";
const WebSocketDemo = React.lazy(() => import("./WebSocketDemo"));
const MyLazyComponent = React.lazy(() => import("./MyLazyComponent"));
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <WebSocketDemo />
      </Suspense>
    </div>
  );
}

export default App;
