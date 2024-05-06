import React from 'react'

export function HorizontalCard({description, imageUrl , title="" ,imgClass = ""}) {
  return (
    <div className="flex max-w-2xl items-center rounded-md flex-row ">
      <div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary-black">
            {title}
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            {description}
          </p>
          
        </div>
      </div>
      <div className="flex items-center justify-center md:h-[200px] md:w-[300px] w-[200px]">
        <img
          src = {imageUrl}
          className={"rounded-t-lg max-w-[200px] h-1/2 min-h-[100px] max-h-[200px] w-full md:max-h-full " + imgClass}
        />
      </div>
    </div>
  )
}
export default HorizontalCard
