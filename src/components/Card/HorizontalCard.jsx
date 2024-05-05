import React from 'react'

export function HorizontalCard({description, imageUrl}) {
  return (
    <div className="flex max-w-2xl items-center rounded-md flex-row ">
      <div className="flex items-center justify-center md:h-[200px] md:w-[300px] h-[100px] w-[200px]">
        <img
          src = {imageUrl}
          className="w-full"
        />
      </div>
      <div>
        <div className="p-4">
          
          <p className="mt-3 text-sm text-gray-600">
            {description}
          </p>
          
        </div>
      </div>
    </div>
  )
}
export default HorizontalCard
