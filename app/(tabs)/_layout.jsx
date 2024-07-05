import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-7"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#025073",
          tabBarInactiveTintColor: "#5D738C",
          tabBarStyle: {
            backgroundColor: "#71C7EC",
            borderTopWidth: 1,
            borderTopColor: "#5D738C",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="addPatient"
          options={{
            title: "Patient Admission Form",
            headerShown: "false",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.create}
                color={color}
                name="Add"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="patientsList"
          options={{
            title: "Patients List",
            headerShown: "false",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.users}
                color={color}
                name="Patients"
                focused={focused}
              />
            ),
          }}
        />
    </Tabs>
  );
}
