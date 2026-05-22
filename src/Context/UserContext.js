import { createContext } from "react";
import { useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [UserToken, setUserToken] = useState(null);
  const [NameSignIn, setNameSignIn] = useState(null);

  return (
    <>
      <UserContext.Provider
        value={{ UserToken, setUserToken, NameSignIn, setNameSignIn }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
}
