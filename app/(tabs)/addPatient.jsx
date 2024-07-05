import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomSelect from "../../components/CustomSelect";
import {
  addNewPatient,
  updatePatient,
  resetSelectedPatient,
} from "../../redux/patientSlice";

export default function AddPatient() {
  const selectedPatient = useSelector(
    (state) => state.patients.selectedPatient
  );
  const [formData, setFormData] = useState({
    id: selectedPatient?.id || null,
    firstName: selectedPatient?.firstName || "",
    lastName: selectedPatient?.lastName || "",
    dateOfBirth: selectedPatient
      ? new Date(selectedPatient.dateOfBirth)
      : new Date(),
    gender: selectedPatient?.gender || "",
    admissionDate: selectedPatient
      ? new Date(selectedPatient.admissionDate)
      : new Date(),
    currentBed: selectedPatient?.currentBed || "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        id: selectedPatient.id,
        firstName: selectedPatient.firstName,
        lastName: selectedPatient.lastName,
        dateOfBirth: new Date(selectedPatient.dateOfBirth),
        gender: selectedPatient.gender,
        admissionDate: new Date(selectedPatient.admissionDate),
        currentBed: selectedPatient.currentBed,
      });
    }
  }, [selectedPatient]);

  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const validateBed = (value) => {
    const numberRegex = /^[0-9]+$/;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (numberRegex.test(value)) {
      const numberValue = parseInt(value, 10);
      if (numberValue < 1 || numberValue > 99999) {
        return "Number must be between 1 and 99999";
      }
    } else if (!alphanumericRegex.test(value)) {
      return "Invalid input. Only numbers, letters, or a combination are allowed";
    }
    return "";
  };

  const handleSubmit = () => {
    const {
      id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      admissionDate,
      currentBed,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !admissionDate ||
      !currentBed
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const bedValidationError = validateBed(currentBed);
    if (bedValidationError) {
      Alert.alert("Error", bedValidationError);
      return;
    }

    setSubmitting(true);
    const action = id ? updatePatient(formData) : addNewPatient(formData);
    dispatch(action)
      .unwrap()
      .then(() => {
        setSubmitting(false);
        setFormData({
          id: null,
          firstName: "",
          lastName: "",
          dateOfBirth: new Date(),
          gender: "",
          admissionDate: new Date(),
          currentBed: "",
        });
        dispatch(resetSelectedPatient());
      })
      .catch((error) => {
        setSubmitting(false);
        Alert.alert("Error", error);
      });
  };

  const router = useRouter();

  const handleReset = () => {
    dispatch(resetSelectedPatient());
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      gender: "",
      admissionDate: new Date(),
      currentBed: "",
    });
    router.push("/addPatient");
  };

  const genderData = [
    { key: "female", value: "Female" },
    { key: "male", value: "Male" },
    { key: "other", value: "Other" },
  ];

  return (
    <>
      <SafeAreaView>
        <ScrollView className="bg-primary h-full p-2">
          <FormField
            title="First Name"
            value={formData.firstName}
            handleChangeText={(e) => setFormData({ ...formData, firstName: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Last Name"
            value={formData.lastName}
            handleChangeText={(e) => setFormData({ ...formData, lastName: e })}
            otherStyles="mt-7"
          />
          <CustomDatePicker
            title="Date Of Birth"
            value={formData.dateOfBirth}
            onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
            otherStyles="mt-7"
          />
          <View className="mt-7">
            <Text className="text-base text-gray-100 font-pmedium">Gender</Text>
            <CustomSelect
              data={genderData}
              setSelected={(val) => setFormData({ ...formData, gender: val })}
              placeholder="Select gender"
              value={formData.gender}
            />
          </View>
          <CustomDatePicker
            title="Admission Date"
            value={formData.admissionDate}
            onChange={(date) =>
              setFormData({ ...formData, admissionDate: date })
            }
            otherStyles="mt-7"
          />
          <FormField
            title="Current Bed"
            value={formData.currentBed}
            handleChangeText={(e) =>
              setFormData({ ...formData, currentBed: e })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title={formData.id ? "Update Patient" : "Add Patient"}
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Reset Form"
            handlePress={handleReset}
            containerStyles="mt-7 bg-yellow mb-10"
          />
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
}
