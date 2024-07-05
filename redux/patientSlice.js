import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateDates, validateBedAvailability } from "./utils/validations";

const API_URL = "http://localhost:5001/api/patients";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(API_URL);
    const patients = response.data;

    await AsyncStorage.setItem("patients", JSON.stringify(patients));

    return patients;
  }
);

export const addNewPatient = createAsyncThunk(
  "patients/addPatient",
  async (patient, { rejectWithValue }) => {
    try {
      validateDates(patient.dateOfBirth, patient.admissionDate);
      await validateBedAvailability(patient.currentBed);

      const response = await axios.post(API_URL, patient);

      const patients = JSON.parse(await AsyncStorage.getItem("patients")) || [];
      patients.push(response.data);
      await AsyncStorage.setItem("patients", JSON.stringify(patients));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (patient, { rejectWithValue }) => {
    try {
      const storedPatients = JSON.parse(await AsyncStorage.getItem("patients")) || [];
      const existingPatient = storedPatients.find(p => p.id === patient.id);
      
      if (existingPatient && existingPatient.dischargeDate) {
        throw new Error("Patient is already discharged.");
      }

      validateDates(patient.dateOfBirth, patient.admissionDate);
      await validateBedAvailability(patient.currentBed, patient.id);

      const response = await axios.put(`${API_URL}/${patient.id}`, patient);

      const patients = JSON.parse(await AsyncStorage.getItem("patients")) || [];
      const patientIndex = patients.findIndex((p) => p.id === patient.id);
      if (patientIndex > -1) {
        patients[patientIndex] = response.data;
        await AsyncStorage.setItem("patients", JSON.stringify(patients));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dischargePatient = createAsyncThunk(
  "patients/dischargePatient",
  async ({ id, dischargeDate }, { rejectWithValue }) => {
    try {
      const patients = JSON.parse(await AsyncStorage.getItem("patients")) || [];
      const patient = patients.find((p) => p.id === id);
      if (!patient) {
        throw new Error("Patient not found");
      }
      if (patient.dischargeDate) {
        throw new Error("Patient is already discharged.");
      }

      validateDates(patient.dateOfBirth, patient.admissionDate, dischargeDate);

      const response = await axios.put(`${API_URL}/${id}`, { dischargeDate });

      const patientIndex = patients.findIndex((p) => p.id === id);
      if (patientIndex > -1) {
        patients[patientIndex].dischargeDate = dischargeDate;
        patients[patientIndex].currentBed = "-";
        await AsyncStorage.setItem("patients", JSON.stringify(patients));
      }

      return { id, dischargeDate, currentBed: "-" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    selectedPatient: null,
    status: null,
  },
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    resetSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.status = "success";
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
        state.status = "success";
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index >= 0) {
          state.patients[index] = action.payload;
        }
        state.status = "success";
      })
      .addCase(dischargePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index >= 0) {
          state.patients[index].dischargeDate = action.payload.dischargeDate;
          state.patients[index].currentBed = action.payload.currentBed;
        }
        state.status = "success";
      })
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addNewPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(dischargePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dischargePatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedPatient, resetSelectedPatient } =
  patientSlice.actions;
export default patientSlice.reducer;
