// Title: Chef Christoffel's Menu App
// Author: Seyuri Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)



import React from "react";
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, RootStackParamlist } from "../type";

// Defining the Props type for the HomeScreen component
// This combines navigation props from React Navigation with custom props for items, removeItem, and averages.
type Props = NativeStackScreenProps<RootStackParamlist, "HomeScreen"> & {
  items: menuItem[]; // Array of menu items displayed on the HomeScreen
  removeItem: (id: string) => void; // Function to remove an item by its ID
  averages: { STARTER: string; MAIN: string; DESSERT: string }; // Average prices for each category
};

// Exporting the HomeScreen component as the default export
export default function HomeScreen({ navigation, items, removeItem, averages }: Props) {
  // Function that confirms whether the user wants to remove an item
  const confirmRemove = (id: string) => {
    Alert.alert("Remove item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" }, // Option to cancel the action
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) }, // Confirms removal
    ]);
  };

  // Returning the main JSX layout for the HomeScreen UI
  return (
    <SafeAreaView style={styles.container}> {/* Ensures content stays within the safe area of the device */}
      <Text style={styles.heading}>Our Menu ({items.length})</Text> {/* Displays heading and number of menu items */}

      {/* Row displaying category statistics (Starters, Mains, Desserts) */}
      <View style={styles.statsRow}>
        {/* Mapping through each category to display its data */}
        {["STARTER","MAIN","DESSERT"].map((cat) => (
          <View key={cat} style={styles.stat}> {/* Each stat card */}
            <Text style={styles.statLabel}>{cat}s</Text> {/* Displays category name */}
            <Text style={styles.statValue}>R{averages[cat as keyof typeof averages]}</Text> {/* Displays average price */}
            <Text style={styles.statCount}>
              {items.filter(i => i.category === cat).length} items {/* Counts how many items in that category */}
            </Text>
          </View>
        ))}
      </View>

      {/* FlatList used to render each menu item dynamically */}
      <FlatList
        data={items} // List data source
        keyExtractor={(i) => i.id} // Unique key for each item
        renderItem={({ item }) => ( // Defines how each item is rendered
          <View style={styles.card}> {/* Container for each menu item */}
            <Image source={{ uri: item.image }} style={styles.image} /> {/* Displays the item image */}
            <View style={styles.body}> {/* Holds the item details */}
              <Text style={styles.title}>{item.itemName}</Text> {/* Item name */}
              <Text style={styles.desc}>{item.description}</Text> {/* Short description */}
              <Text style={styles.meta}>
                {item.category} · R{item.price} · {item.intensity} {/* Category, price, and intensity info */}
              </Text>
              <TouchableOpacity style={styles.remove} onPress={() => confirmRemove(item.id)}> {/* Remove button */}
                <Text style={styles.removeText}>Remove</Text> {/* Button label */}
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }} // Adds padding at bottom for scroll spacing
      />

      {/* Floating action buttons (FABs) for navigation actions */}
      <View style={styles.fabs}>
        {/* Button to navigate to the AddItemScreen */}
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddItemScreen")}>
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>

        {/* Button to navigate to the Filter screen */}
        <TouchableOpacity style={[styles.fab, styles.fabAlt]} onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.fabText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Defining color constants used throughout the styles for easy theme management
const c = { bg:"#12100f", card:"#1b1513", text:"#f5e9d7", meta:"#b69b7f", accent:"#5c0d0dff", chip:"#2b221f" };

// Creating a StyleSheet to define all styles for the component
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:c.bg, padding:16 }, // Main container styling
  heading: { color:c.text, fontSize:26, fontWeight:"900", textAlign:"center", marginBottom:12 }, // Title styling
  statsRow: { flexDirection:"row", justifyContent:"space-between", marginBottom:12 }, // Layout for stats row
  stat: { backgroundColor:c.card, width:"32%", borderRadius:14, paddingVertical:10, alignItems:"center", elevation:3 }, // Stat card design
  statLabel: { color:c.meta, fontSize:12 }, // Category label style
  statValue: { color:c.text, fontSize:16, fontWeight:"800" }, // Average price style
  statCount: { color:c.meta, fontSize:11, marginTop:4 }, // Count of items style
  card: { backgroundColor:c.card, borderRadius:16, overflow:"hidden", marginVertical:8, elevation:4 }, // Card design for each menu item
  image: { width:"100%", height:200 }, // Image size
  body: { padding:12 }, // Padding for item text content
  title: { color:c.text, fontSize:18, fontWeight:"800" }, // Item title text
  desc: { color:c.meta, marginVertical:6 }, // Description text styling
  meta: { color:c.text, fontSize:12, opacity:0.7 }, // Meta info text styling
  remove: { backgroundColor:c.chip, paddingVertical:10, borderRadius:10, alignItems:"center", marginTop:10 }, // Remove button style
  removeText: { color:c.text, fontWeight:"800" }, // Remove button text style
  fabs: { position:"absolute", right:20, bottom:20, flexDirection:"row", gap:12 }, // Floating buttons container
  fab: { backgroundColor:c.accent, paddingVertical:14, paddingHorizontal:22, borderRadius:30, elevation:6 }, // Add button style
  fabAlt: { backgroundColor:"#300404ff" }, // Alternate style for Filter button
  fabText: { color:c.bg, fontWeight:"900" }, // FAB text styling
});





//REFERENCING 
//Meta. (2025) React Native Documentation. Available at: https://reactnative.dev/docs
 //(Accessed: 10 November 2025).

//W3Schools. (2025) React Native Tutorial. Available at: https://www.w3schools.com/react/react_native_intro.asp
 //(Accessed: 10 November 2025).

 //Pexels. (2025) Pexels – Free Stock Photos and Videos. Available at: https://www.pexels.com
 //(Accessed: 10 November 2025).
