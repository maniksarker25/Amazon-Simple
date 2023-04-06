import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // console.log(cart)

  // useState-----
  useEffect(() => {
    fetch(
      " https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //    useEffect(()=>{
  //     const storedCart = getShoppingCart();
  //     // console.log(storedCart)
  //     const savedCart = [];
  //     for( const id in storedCart){
  //         const addedProduct = products.find(product => product.id === id);

  //         if(addedProduct){
  //             // console.log(addedProduct)
  //             const quantity = addedProduct[id];
  //             addedProduct.quantity = quantity;
  //             savedCart.push(addedProduct);
  //         }
  //     }
  //     setCart(savedCart);

  //    },[products])
  useEffect(() => {
    const storedCart = getShoppingCart();
    let savedCart = [];
    for (const id in storedCart) {
      const addedCart = products.find((product) => product.id === id);
      if (addedCart) {
        const quantity = storedCart[id];
        addedCart.quantity = quantity;
        savedCart.push(addedCart);
      }
    }
    setCart(savedCart);
  }, [products]);
  // event handle
  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart,product];
    // if product doesn't exits in the cart, then set quantity = 1;
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.id);
  };
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container lg:flex my-6 ">
      <div className="product-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:w-9/12 mr-3">
        {products.map((product) => (
          <Product
            handleAddToCart={handleAddToCart}
            product={product}
            key={product.id}
          ></Product>
        ))}
      </div>
      <div className="cart-container lg:w-3/12">
        <Cart handleClearCart={handleClearCart} cart={cart}>
          <Link to="/orders">
            <button className='bg-orange-600 w-10/12 rounded-lg mx-auto flex justify-between items-center p-3 text-white font-bold mt-3' >
              <span>Order Review</span>{" "}
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

export default Shop;
