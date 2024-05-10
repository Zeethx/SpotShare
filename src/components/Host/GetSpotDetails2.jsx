import React, { useState, useRef } from 'react'
import { TextAreaInput, InputField, FormFooter } from '../'

function GetSpotDetails2({setStep}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [accessInfo, setAccessInfo] = useState("");
    const [textAreaError, setTextAreaError] = useState("");

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (e.target.value.length < 20) {
            setTextAreaError("Description must be at least 20 characters long");
        } else {
            setTextAreaError("");
        }
    }

    const descriptionRef = useRef();
    const accessInfoRef = useRef();

  return (
            <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center justify-center h-full p-4 w-full">
                    <div className="flex flex-col items-center justify-center">
                        <div className='mb-10 w-full'>
                            <label className='text-xl lg:text-2xl font-bold'>Title</label>
                            <InputField type="text" placeholder="Title" value={title} 
                            className="py-2 lg:py-4 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full mr-2 my-1 lg:my-0" 
                            onChange={(e) => setTitle(e.target.value)} 
                            required />
                        </div>
                        <div className='mb-10 w-full'>
                            <label className='text-xl lg:text-2xl font-bold'>Description</label>
                            <TextAreaInput placeholder="Description" value={description} ref={descriptionRef} 
                            rows={3}
                            onChange={handleDescriptionChange} 
                            minLength={20} maxLength={300}
                            required/>
                            {textAreaError && <p className="text-red-500 text-sm">{textAreaError}</p>}
                        </div>
                        <div className='mb-10 w-full'>
                            <label className='text-xl lg:text-2xl font-bold'>Access Information</label>
                            <TextAreaInput placeholder="Access Information" value={accessInfo} ref={accessInfoRef}
                            rows={2} cols={50}
                            onChange={(e) => setAccessInfo(e.target.value)} />
                        </div>
                    </div>
                </div>
                { <FormFooter text="Start Sharing Your Space: Step 2" to="/become-a-host/spot-details" /*disabledCondition={ !title || description.length < 20 }*/ onNextClick={()=> setStep(3)} /> }
            </div>
  )
}

export default GetSpotDetails2