import React from "react";
import {
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-primary h-full relative flex justify-center items-center">
      <Image
        source={require("../assets/welcome.png")}
        className="w-full h-full flex-1"
        resizeMode="contain"
      />
      <Animated.View entering={FadeInDown.delay(100).springify()} className="flex items-center">
        <Text
          style={{ fontSize: hp(5) }}
          className="text-white font-bold tracking-wide"
        >
          Best <Text className="text-primary-100">HealthCare</Text>
        </Text>
        <Text
          style={{ fontSize: hp(5) }}
          className="text-white font-bold tracking-wide"
        >
          For You
        </Text>
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).springify()} className="mt-8">
        <TouchableOpacity
          style={{ height: hp(7), width: wp(80) }}
          className="bg-primary-100 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          onPress={() => router.push("/addPatient")}
        >
          <Text
            style={{ fontSize: hp(3) }}
            className="text-white font-bold tracking-widest"
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}