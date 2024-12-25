import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const ellipseScale = useRef(new Animated.Value(0.7)).current; // Skala ellipse
  const backgroundColor = useRef(new Animated.Value(0)).current; // Warna latar belakang
  const textTranslateY = useRef(new Animated.Value(height * 0.7)).current; // Posisi vertikal teks
  const textOpacity = useRef(new Animated.Value(0)).current; // Opasitas teks
  const addScale = useRef(new Animated.Value(0.7)).current; // Skala gambar "add"
  const addTranslateY = useRef(new Animated.Value(0)).current; // Posisi vertikal gambar "add"

  useEffect(() => {
    Animated.parallel([
      // Animasi ellipse
      Animated.timing(ellipseScale, {
        toValue: 3,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Animasi latar belakang
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      // Animasi teks
      Animated.timing(textTranslateY, {
        toValue: height * 0.52,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Animasi gambar "add"
      Animated.timing(addScale, {
        toValue: 0.9, // Membesar sedikit
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(addTranslateY, {
        toValue: -height * 0.03, // Naik sedikit
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    ellipseScale,
    backgroundColor,
    textTranslateY,
    textOpacity,
    addScale,
    addTranslateY,
  ]);

  const backgroundColorInterpolated = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#1E3A8A"],
  });

  return (
    <Animated.View
      style={[
        styles.splashScreen,
        { backgroundColor: backgroundColorInterpolated },
      ]}
    >
      <Animated.View
        style={[
          styles.ellipseContainer,
          { transform: [{ scale: ellipseScale }] },
        ]}
      >
        <Image
          style={styles.ellipseImage}
          contentFit="contain"
          source={require("../assets/ellipse-1.png")}
        />
      </Animated.View>
      <Animated.Image
        style={[
          styles.centerImage,
          {
            transform: [
              { scale: addScale }, // Animasi membesar gambar "add"
              { translateY: addTranslateY }, // Animasi naik gambar "add"
            ],
          },
        ]}
        contentFit="contain"
        source={require("../assets/add-a-subheading-2-1.png")}
      />
      <Animated.Text
        style={[
          styles.welcomeText,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        Selamat Datang
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  ellipseContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipseImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  centerImage: {
    position: "absolute",
    width: "80%", // Ukuran asli gambar "add"
    height: "20%",
    alignSelf: "center",
    top: height * 0.35, // Pastikan tetap di area layar
  },
  welcomeText: {
    position: "absolute",
    fontSize: width * 0.05,
    fontWeight: "300",
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    textAlign: "center",
    alignSelf: "center",
  },
});

export default SplashScreen;
