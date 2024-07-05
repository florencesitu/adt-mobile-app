import React, { useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../../redux/patientSlice";
import PatientTile from "../../components/PatientTile";
import { icons } from "../../constants";

export default function Patients({ navigation }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  console.log("Patients:", patients);

  return (
    <SafeAreaView className="bg-primary h-full">
      {patients.length === 0 ? (
        <View className="flex justify-center items-center h-full">
          <Image
            source={icons.empty}
            className="w-20 h-20 mb-4"
            resizeMode="contain"
          />
          <Text className="text-black-100 font-psemibold text-lg">
            Add new patients for more access
          </Text>
        </View>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PatientTile patient={item} />}
        />
      )}
    </SafeAreaView>
  );
}
