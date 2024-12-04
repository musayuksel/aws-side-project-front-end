import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>As always...</h1>
      <h2>Hello world!</h2>
      <button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
    </>
  );
};
