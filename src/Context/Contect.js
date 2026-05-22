import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [Counter, setCounter] = useState(10);

  // console.log(props);
  return (
    <>
      <CounterContext.Provider value={{ Counter, setCounter }}>
        {props.children}
      </CounterContext.Provider>
    </>
  );
}
