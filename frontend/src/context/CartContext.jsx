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
    

    console.log("Prev Cart:", prev);
    console.log("Product Added:", product);

    const existingProduct = prev.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      const updatedCart = prev.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: (item.quantity || 1 )+ 1,
            }
          : item
      );

      return updatedCart;
    }

    return [
      ...prev,
      {
        ...product,
        quantity: 1,
      },
    ];
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
 console.log(
  JSON.stringify(cartItems, null, 2)
);

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