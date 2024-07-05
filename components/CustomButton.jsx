import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}
