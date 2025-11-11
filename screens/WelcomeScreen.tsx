import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../type";

type Props = NativeStackScreenProps<RootStackParamlist, "WelcomeScreen">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3534750/pexels-photo-3534750.jpeg?_gl=1*1kc2l8x*_ga*MTQzMTgzMDEyMC4xNzYwNDIzNDk2*_ga_8JE65Q40S6*czE3NjEwMzAzMDckbzIkZzEkdDE3NjEwMzAzMTAkajU3JGwwJGgw",
        }}
        style={styles.bg}
      >
        <View style={styles.overlay} />
        <View style={styles.center}>
          <Text style={styles.title}>Welcome to Chef Christoffel's Kitchen</Text>
          <Text style={styles.subtitle}>Your fine dining experience, right at your fingertips.</Text>
          <TouchableOpacity style={styles.cta} onPress={() => navigation.replace("HomeScreen")}>
            <Text style={styles.ctaText}>MENU</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12100f" },
  bg: { flex: 1, justifyContent: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(12,9,8,0.55)" },
  center: { alignItems: "center", paddingHorizontal: 24 },
  title: { color: "#f5e9d7", fontSize: 42, fontWeight: "800" },
  subtitle: { color: "#450404ff", fontSize: 16, marginTop: 6, marginBottom: 28 },
  cta: { backgroundColor: "#c08a5a", paddingVertical: 14, paddingHorizontal: 44, borderRadius: 28, elevation: 6 },
  ctaText: { color: "#1b1513", fontWeight: "900", fontSize: 18 },
});