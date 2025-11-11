
// Title: Chef Christoffel's Menu App
// Author: Seyuri Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)

import React from "react";

import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamlist } from "../type";

// Defining the props type for this screen based on the navigation stack
type Props = NativeStackScreenProps<RootStackParamlist, "WelcomeScreen">;

// Exporting the functional component for the Welcome Screen
export default function WelcomeScreen({ navigation }: Props) {
  return (
    // SafeAreaView ensures content doesn’t overlap with device notches or status bars
    <SafeAreaView style={styles.container}>
      {/* Background image for the welcome screen */}
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3534750/pexels-photo-3534750.jpeg?_gl=1*1kc2l8x*_ga*MTQzMTgzMDEyMC4xNzYwNDIzNDk2*_ga_8JE65Q40S6*czE3NjEwMzAzMDckbzIkZzEkdDE3NjEwMzAzMTAkajU3JGwwJGgw",
        }}
        style={styles.bg}
      >
        {/* Semi-transparent overlay to darken the background image */}
        <View style={styles.overlay} />
        {/* Centralized content (text and button) */}
        <View style={styles.center}>
          {/* Main heading text */}
          <Text style={styles.title}>Welcome to Chef Christoffel's Kitchen</Text>
          {/* Subtitle text for additional context */}
          <Text style={styles.subtitle}>Your fine dining experience, right at your fingertips.</Text>
          {/* Button that navigates to the HomeScreen */}
          <TouchableOpacity style={styles.cta} onPress={() => navigation.replace("HomeScreen")}>
            <Text style={styles.ctaText}>MENU</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// StyleSheet for consistent styling across components
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12100f" }, // full-screen dark background
  bg: { flex: 1, justifyContent: "center" }, // centers background image content
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(12,9,8,0.55)" }, // dark overlay
  center: { alignItems: "center", paddingHorizontal: 24 }, // centers items horizontally
  title: { color: "#f5e9d7", fontSize: 42, fontWeight: "800" }, // large welcome title
  subtitle: { color: "#450404ff", fontSize: 16, marginTop: 6, marginBottom: 28 }, // smaller subtitle
  cta: { backgroundColor: "#c08a5a", paddingVertical: 14, paddingHorizontal: 44, borderRadius: 28, elevation: 6 }, // button style
  ctaText: { color: "#1b1513", fontWeight: "900", fontSize: 18 }, // text style for button
});




//REFERENCING

//Pexels. (2025) Pexels – Free Stock Photos and Videos. Available at: https://www.pexels.com
 //(Accessed: 10 November 2025).