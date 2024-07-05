import React, { useState } from "react";
import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { icons } from "../constants";
import {
  setSelectedPatient,
  dischargePatient,
} from "../redux/patientSlice";
import CustomDatePicker from "./CustomDatePicker";
import CustomButton from "./CustomButton";
import Modal from "react-native-modal";

export default function PatientTile({ patient }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [dischargeDate, setDischargeDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    dispatch(setSelectedPatient(patient));
    router.push("/addPatient");
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDischarge = () => {
    if (!dischargeDate) {
      Alert.alert("Error", "Discharge date is required.");
      return;
    }
    dispatch(dischargePatient({ id: patient.id, dischargeDate }))
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Patient discharged successfully.");
        setDischargeDate(new Date());
        setModalVisible(false);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toISOString();
  };

  return (
    <View className="m-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <TouchableOpacity className="p-4" onPress={toggleExpand}>
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="text-lg font-bold">
              Patient: {patient.firstName} {patient.lastName}
            </Text>
            <Text className="text-gray-600">
              Current Bed: {patient.currentBed}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.edit}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View className="p-4 bg-gray-100 border-t border-gray-200">
          <Text>
            Date of Birth:{" "}
            {patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toISOString()
              : "N/A"}
          </Text>
          <Text>Gender: {patient.gender}</Text>
          <Text>
            Admission Date:{" "}
            {patient.admissionDate
              ? new Date(patient.admissionDate).toISOString()
              : "N/A"}
          </Text>
          <Text>Current Bed: {patient.currentBed}</Text>
          <Text>
            Discharge Date:{" "}
            {patient.dischargeDate
              ? new Date(patient.dischargeDate).toISOString()
              : "N/A"}
          </Text>
          <View className="mt-4 flex-row justify-center">
            <CustomButton
              title="Transfer"
              handlePress={handlePress}
              containerStyles="flex-1 mr-1"
            />
            <CustomButton
              title="Discharge"
              handlePress={toggleModal}
              containerStyles="flex-1 ml-1"
            />
          </View>
        </View>
      )}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View className="bg-white p-4 rounded-lg">
          <Text className="text-lg font-bold mb-4">Enter Discharge Date</Text>
          <CustomDatePicker
            title="Discharge Date"
            value={dischargeDate}
            onChange={(date) => {
              setDischargeDate(date);
            }}
            titleStyles="text-black"
            containerStyles="bg-primary-100"
          />
          <CustomButton
            title="Submit"
            handlePress={handleDischarge}
            containerStyles="mt-4"
          />
        </View>
      </Modal>
    </View>
  );
}
