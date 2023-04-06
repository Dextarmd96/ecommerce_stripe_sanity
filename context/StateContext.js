import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();


export const StateContext = ({ children }) => {



  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let findProduct;
  let index;


  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (cartProduct) => cartProduct._id === product._id,
    );

    if (checkProductInCart) {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added`);
    } else {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
      // eslint-disable-next-line no-param-reassign
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added`);
    }
  };

  const onRemove = (product) => {
    findProduct = cartItems.find((item) => item._id === product._id);
    const tempCart = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
    setTotalQuantities(totalQuantities - findProduct.quantity);
    setCartItems(tempCart);
  };

  const toggleCartItemQuantity = (id, value) => {
    findProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === 'inc') {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;
      setTotalPrice(totalPrice + findProduct.price);
      setTotalQuantities(totalQuantities + 1);
    }

    if (value === 'dec') {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(totalPrice - findProduct.price);
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };


  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };

  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };



  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onAdd,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        setTotalPrice,
        setTotalQuantities,
        showCart,
        incQty,
        decQty,
        qty,
        toggleCartItemQuantity,
        onRemove,
        setCartItems
        
      }}
    >
      {children}
    </Context.Provider>
  );

}


export const useStateContext = () => useContext(Context);