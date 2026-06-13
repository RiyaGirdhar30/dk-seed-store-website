import { createContext, useState, useEffect} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
const [cartItems, setCartItems] = useState(() => {
  const savedCart =
    localStorage.getItem("dkCart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

const addToCart = (product) => {
  setCartItems((prev) => {
    const updatedCart = [...prev, product];
    console.log("Updated Cart:", updatedCart);
    return updatedCart;
  });
};

 const removeFromCart = (indexToRemove) => {
    setCartItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearCart = () => {
  setCartItems([]);
};

useEffect(() => {
  localStorage.setItem(
    "dkCart",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;