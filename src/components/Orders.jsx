import React, { useState } from "react";
import Cart from "./Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "./ReviewItem/ReviewItem";
import { deleteShoppingCart, removeFromDb } from "../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((pd) => pd.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className=" flex flex-col md:flex-row mt-48 px-12 md:px-12 gap-4 lg:px-32 justify-between">
      <div className="product-container lg:w-7/12">
        {cart.map((product) => (
          <ReviewItem
            handleRemoveFromCart={handleRemoveFromCart}
            key={product.id}
            product={product}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container lg:w-5/12">
        <Cart handleClearCart={handleClearCart} cart={cart}>
          <Link to='/checkout'>
            <button className='bg-orange-600 w-10/12 rounded-lg mx-auto flex justify-between items-center p-3 text-white font-bold mt-3' >
              <span>Proceed Checkout</span>
              <FontAwesomeIcon
                
                icon={faTrashAlt}
              />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
