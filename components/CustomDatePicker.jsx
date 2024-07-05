import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CustomDatePicker({ title, value, onChange, otherStyles, titleStyles, containerStyles }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    onChange(selectedDate);
  };

  const formattedDate = value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <View className={`space-y-2 ${otherStyles} `}>
      <Text className={`text-base text-gray-100 font-pmedium ${titleStyles}`}>{title}</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        className={`w-full h-16 px-4 bg-secondary rounded-2xl border-2 border-black-200 flex-row items-center ${containerStyles}`}
      >
        <Text className="flex-1 text-white font-psemibold text-base">
          {formattedDate}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
