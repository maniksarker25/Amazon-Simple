import React from "react";
import './Product.css'

const Product = ({product,handleAddToCart}) => {
    const {img,ratings,price,name,seller} =product;
  return (
    <div>
      <div className="card w-full  bg-base-100 shadow-xl">
        <figure>
          <img className=""
            src={img}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: ${price}</p>
          <p>Manufacturer: {seller}</p>
          <p>Rating: {ratings}</p>
          <div className="card-actions justify-end">
            <button onClick={()=>handleAddToCart(product)} className="btn bg-orange-200 text-black hover:bg-orange-500 ">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
