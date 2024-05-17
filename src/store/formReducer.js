import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  typeOfSpot: '',
  vehicleSize: '',
  spacesToRent: 1,
  title: '',
  description: '',
  accessInstructions: '',
  spotImages: [],
  pricePerHour: '',
  pricePerDay: '',
  pricePerMonth: '',
  availableFrom: '',
  daysAvailable: [],
  customTimes: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      if (name === 'spotImages') {
        state.spotImages = value;
      } else {
        state[name] = value;
      }
    },
    addImage: (state, action) => {
      state.spotImages.push(action.payload);
    },
    removeImage: (state, action) => {
      state.spotImages = state.spotImages.filter((_, index) => index !== action.payload);
    },
  },
});

export const { updateForm, addImage, removeImage } = formSlice.actions;

export default formSlice.reducer;
