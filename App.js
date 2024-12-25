import React from "react";
import { useFonts } from "expo-font";
import SplashScreen from "./screens/Splashscreen";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Jangan tampilkan apa pun jika font belum dimuat
  }

  return <SplashScreen />;
};

export default App;
