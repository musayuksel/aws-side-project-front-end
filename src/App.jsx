import { useState } from "react";
import { CbAppContainer } from "./components/CbAppContainer";
import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);

  // async function sendData() {
  //   const response = await fetch(
  //     "https://4nu5wypahe.execute-api.eu-west-1.amazonaws.com/Prod/user",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: "test@test.com",
  //         name: "Test",
  //         age: 31,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  // console.log(sendData());
  return (
    <>
      <CbAppContainer />
    </>
  );
};
