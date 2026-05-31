import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

let UserToken = localStorage.getItem("userToken");
let header = {
  token: UserToken,
};

async function addToCart(id) {
  return await axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: header,
      },
    )
    .then((response) => response)
    .catch((error) => error);
}

async function updateCartProductQuantity(id, count) {
  return await axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: header,
      },
    )
    .then((response) => response)
    .catch((error) => error);
}

async function getLoggedUserCart() {
  return await axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}

async function removeSpecificCartItem(id) {
  return await axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}

async function clearUserCart() {
  return await axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: header,
    })
    .then((response) => response)
    .catch((error) => error);
}

export default function CartContextProvider({ children }) {
  return (
    <>
      <CartContext.Provider
        value={{
          addToCart,
          updateCartProductQuantity,
          getLoggedUserCart,
          removeSpecificCartItem,
          clearUserCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
