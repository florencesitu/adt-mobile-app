import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateDates = (dateOfBirth, admissionDate, dischargeDate) => {
  const today = new Date();

  if (new Date(dateOfBirth) > today) {
    throw new Error("Patient's date of birth cannot be later than today's date.");
  }
  if (admissionDate && new Date(admissionDate) < new Date(dateOfBirth)) {
    throw new Error("Patient's admission date cannot be earlier than date of birth.");
  }
  if (admissionDate && new Date(admissionDate) > today) {
    throw new Error("Patient's admission date cannot be later than today's date.");
  }
  if (dischargeDate && new Date(dischargeDate) > today) {
    throw new Error("Patient's discharge date cannot be later than today's date.");
  }
  if (dischargeDate && new Date(dischargeDate) < new Date(admissionDate)) {
    throw new Error("Discharge date cannot be earlier than admission date.");
  }
};

export const validateBedAvailability = async (currentBed, patientId = null) => {
  const patients = JSON.parse(await AsyncStorage.getItem("patients")) || [];
  const isBedTaken = patients.some(
    (p) => p.currentBed === currentBed && p.id !== patientId && !p.dischargeDate
  );
  if (isBedTaken) {
    throw new Error("The bed is already taken.");
  }
};
