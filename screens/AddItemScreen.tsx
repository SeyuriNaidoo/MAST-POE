import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, Course, RootStackParamlist } from "../type";

// Define the props type for the AddItemScreen, combining navigation props and a custom addItem function
type Props = NativeStackScreenProps<RootStackParamlist, "AddItemScreen"> & {
  addItem: (item: menuItem) => void; // Function passed in to add a new menu item
};

// Define a consistent color palette for the screen’s UI elements
const c = {
  bg: "#12100f", // background color (dark brown/black tone)
  card: "#1b1513", // card background color
  text: "#e5d6c0ff", // main text color (light beige)
  meta: "#b69b7f", // secondary text or label color
  accent: "#c4b80cff", // accent color for buttons or icons
  input: "#261d1aff", // input background color
  border: "#300d02ff", // border color for input fields
};

// Helper function that generates a unique ID string for each new item
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); // Combines timestamp and random value
}

// Main functional component for the Add Item screen
export default function AddItemScreen({ navigation, addItem }: Props) {
  // State variables for each field in the add item form
  const [itemName, setItemName] = useState(""); // Stores the dish name
  const [description, setDescription] = useState(""); // Stores the description
  const [category, setCategory] = useState<Course>("STARTER"); // Default category
  const [price, setPrice] = useState(""); // Stores price input
  const [image, setImage] = useState(""); // Stores image URL
  const [ingredients, setIngredients] = useState(""); // Stores comma-separated ingredients

  // Function to validate form inputs and save new item
  const onSave = () => {
    // Check if required fields are filled in
    if (!itemName || !description || !price || !image) {
      Alert.alert("Missing fields", "Please fill in all required fields."); // Alert user if any required field missing
      return; // Stop execution
    }

    // Convert price from string to number
    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      Alert.alert("Invalid price", "Enter a valid number."); // Show alert for invalid number
      return;
    }

    // Determine intensity based on price
    const intensity: menuItem["intensity"] =
      p < 50 ? "mild" : p < 100 ? "balanced" : "strong";

    // Build the final menu item object (payload)
    const payload: menuItem = {
      id: uid(), // Unique identifier
      itemName, // Name from input
      description, // Description from input
      category, // Category selection
      price: p, // Parsed price
      intensity, // Calculated intensity
      image, // Image URL
      ingredients: ingredients
        .split(",") // Split ingredients by commas
        .map((s) => s.trim()) // Remove extra spaces
        .filter(Boolean), // Remove empty entries
    };

    // Add new item to the list
    addItem(payload);
    // Navigate back to the previous screen
    navigation.goBack();
  };

  // UI rendering begins
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust keyboard behavior for different platforms
      style={{ flex: 1 }} // Fill entire screen
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}> {/* Dismiss keyboard when user taps outside inputs */}
        <ScrollView contentContainerStyle={styles.form}> {/* Scrollable form container */}
          <Text style={styles.header}>Add New Item</Text> {/* Form header text */}

          {/* Input for the item name */}
          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor={c.meta}
            value={itemName}
            onChangeText={setItemName}
          />

          {/* Multiline input for item description */}
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor={c.meta}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Category label and picker */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={category}
              onValueChange={(v) => setCategory(v as Course)} // Updates category state when changed
              mode="dropdown"
              dropdownIconColor={c.accent} // Sets color of dropdown icon
              style={styles.picker}
            >
              {/* Category dropdown options */}
              <Picker.Item label="STARTER" value="STARTER" color={c.text} />
              <Picker.Item label="MAIN" value="MAIN" color={c.text} />
              <Picker.Item label="DESSERT" value="DESSERT" color={c.text} />
            </Picker>
          </View>

          {/* Input for price */}
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor={c.meta}
            keyboardType="numeric" // Numeric keyboard for numbers
            value={price}
            onChangeText={setPrice}
          />

          {/* Input for ingredients */}
          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            placeholderTextColor={c.meta}
            value={ingredients}
            onChangeText={setIngredients}
          />

          {/* Input for image URL */}
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor={c.meta}
            value={image}
            onChangeText={setImage}
          />

          {/* Show image preview if a URL has been entered */}
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : null}

          {/* Save button */}
          <TouchableOpacity style={styles.save} onPress={onSave}>
            <Text style={styles.saveText}>Save Item</Text>
          </TouchableOpacity>

          {/* Cancel button to go back */}
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Define all styles used in this screen
const styles = StyleSheet.create({
  form: {
    backgroundColor: c.bg, // Background color of form
    padding: 20, // Padding inside form
    flexGrow: 1, // Allow scrolling when keyboard appears
  },
  header: {
    color: c.text, // Text color for header
    fontSize: 22, // Larger font size
    fontWeight: "900", // Bold header text
    textAlign: "center", // Centered text
    marginBottom: 16, // Spacing below header
  },
  input: {
    backgroundColor: c.input, // Background color of input field
    color: c.text, // Input text color
    borderRadius: 12, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: c.border, // Border color
    height: 50, // Field height
    paddingHorizontal: 12, // Left-right padding inside field
    marginVertical: 8, // Vertical spacing between inputs
  },
  label: {
    color: c.meta, // Label text color
    marginLeft: 4, // Small left margin
    marginBottom: 6, // Space below label
    fontWeight: "700", // Semi-bold label text
  },
  pickerBox: {
    backgroundColor: c.input, // Dropdown container color
    borderRadius: 12, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: c.border, // Border color
    overflow: "hidden", // Hide overflow content
    height: 50, // Height of dropdown
    justifyContent: "center", // Center dropdown text vertically
    marginBottom: 8, // Spacing below picker
  },
  picker: {
    color: c.text, // Text color inside picker
    height: 50,
    width: "100%", // Full width of container
  },
  preview: {
    width: "100%", // Full width image preview
    height: 200, // Fixed height for preview
    borderRadius: 12, // Rounded corners
    marginTop: 12, // Space above preview
  },
  save: {
    backgroundColor: c.accent, // Save button background
    padding: 14, // Padding inside button
    borderRadius: 12, // Rounded corners
    marginTop: 16, // Space above button
    alignItems: "center", // Center text horizontally
  },
  saveText: {
    color: "#1b1513", // Dark text on light button
    fontWeight: "900", // Bold save text
  },
  cancel: {
    alignItems: "center", // Center cancel button text
    marginTop: 10, // Space above cancel
  },
  cancelText: {
    color: c.meta, // Muted color for cancel
    fontWeight: "800", // Bold cancel text
  },
});



//REFERENCING 
//W3Schools. (2025) React Native Forms Tutorial. Available at: https://www.w3schools.com/react/react_native_forms.asp
// (Accessed: 10 November 2025).

//React Navigation. (2025) React Navigation Stack Props Guide. Available at: https://reactnavigation.org/docs/stack-navigator
// (Accessed: 10 November 2025).

//Expo. (2025) React Native Components Guide. Available at: https://docs.expo.dev
 //(Accessed: 10 November 2025).
