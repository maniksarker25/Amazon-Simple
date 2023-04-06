import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product,handleRemoveFromCart }) => {
  const { img, id, name, quantity, price } = product;
  return (
    <div className=" flex justify-between items-center border rounded-md border-gray-300 p-2 lg:w-10/12 mb-3">
      <div className="flex gap-2 items-center">
        <img className="w-[91px] h-[91px] rounded-md" src={img} alt="" />
        <div>
          <p className="font-semibold text-xl">{name}</p>
          <p>
            Price: <span className="text-orange-400">${price}</span>
          </p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
      <div className="pr-4">
        <button onClick={()=>handleRemoveFromCart(id)} className=" rounded-full bg-red-200  flex justify-center items-center w-[55px] h-[55px]">
          <FontAwesomeIcon
            className="text-red-400 text-xl "
            icon={faTrashAlt}
          />
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
