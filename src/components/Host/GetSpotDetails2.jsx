import React, { useState, useEffect } from 'react';
import { TextAreaInput, InputField, FormFooter } from '../';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../../store/formReducer';

function GetSpotDetails2({ setStep }) {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(formData.title || '');
  const [description, setDescription] = useState(formData.description || '');
  const [accessInfo, setAccessInfo] = useState(formData.accessInstructions || '');
  const [textAreaError, setTextAreaError] = useState('');

  useEffect(() => {
    dispatch(updateForm({ name: 'title', value: title }));
    dispatch(updateForm({ name: 'description', value: description }));
    dispatch(updateForm({ name: 'accessInstructions', value: accessInfo }));
  }, [title, description, accessInfo, dispatch]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length < 20) {
      setTextAreaError('Description must be at least 20 characters long');
    } else {
      setTextAreaError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="w-full lg:w-1/2">
      <form className="flex flex-col items-center justify-center h-full p-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 w-full">
            <label className="text-xl lg:text-2xl font-bold">Title</label>
            <InputField
              type="text"
              placeholder="Title"
              value={title}
              className="py-2 lg:py-4 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full mr-2 my-1 lg:my-0"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-10 w-full">
            <label className="text-xl lg:text-2xl font-bold">Description</label>
            <TextAreaInput
              placeholder="Description"
              value={description}
              rows={3}
              onChange={handleDescriptionChange}
              minLength={20}
              maxLength={300}
              required
            />
            {textAreaError && <p className="text-red-500 text-sm">{textAreaError}</p>}
          </div>
          <div className="mb-10 w-full">
            <label className="text-xl lg:text-2xl font-bold">Access Information</label>
            <TextAreaInput
              placeholder="Access Information"
              value={accessInfo}
              rows={2}
              cols={50}
              onChange={(e) => setAccessInfo(e.target.value)}
            />
          </div>
        </div>
        <FormFooter
          text="Start Sharing Your Space: Step 3"
          to="/become-a-host/spot-details"
          disabledCondition={!title || description.length < 20}
          onNextClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default GetSpotDetails2;
