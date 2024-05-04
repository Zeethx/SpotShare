import React from "react";

function Card({ title, description, imageUrl }) {
  return (
    <div className="max-w-sm text-primary-black ">
      <img className="rounded-t-lg " src={imageUrl} alt="" />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-primary-black">
          {title}
        </h5>

        <p className="mb-3 font-normal text-primary-black ">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Card;
