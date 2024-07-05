import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function CustomSelect({
  title,
  data,
  placeholder,
  setSelected,
  value,
  otherStyles,
  ...props
}) {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <SelectList
        data={data}
        setSelected={setSelected}
        placeholder={placeholder}
        search={false}
        boxStyles={{
          backgroundColor: "#179AD3",
          height: 60,
          alignItems: "center",
          borderColor: "black",
          borderWidth: 0,
        }}
        dropdownStyles={{ backgroundColor: "white" }}
        inputStyles={{
          color: "white",
          fontSize: 16,
          fontWeight: "600",
          fontFamily: "Poppins-SemiBold",
        }}
        defaultOption={{ key: value, value: value }}
      />
    </View>
  );
}
