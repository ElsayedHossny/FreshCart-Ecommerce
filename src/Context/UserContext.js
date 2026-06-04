import { createContext } from "react";
import { useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [UserToken, setUserToken] = useState(null);
  const [NameSignIn, setNameSignIn] = useState(null);
  const [UserEmail, setUserEmail] = useState(null);
  const [CartID, setCartID] = useState(null);
  const [NumOfCartItems, setNumOfCartItems] = useState(null);

  return (
    <>
      <UserContext.Provider
        value={{
          UserToken,
          setUserToken,
          NameSignIn,
          setNameSignIn,
          CartID,
          setCartID,
          UserEmail,
          setUserEmail,
          NumOfCartItems,
          setNumOfCartItems,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
}
