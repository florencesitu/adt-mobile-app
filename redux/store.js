import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';

const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
