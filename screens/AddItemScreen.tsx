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

type Props = NativeStackScreenProps<RootStackParamlist, "AddItemScreen"> & {
  addItem: (item: menuItem) => void;
};

const c = {
  bg: "#12100f",
  card: "#1b1513",
  text: "#e5d6c0ff",
  meta: "#b69b7f",
  accent: "#c4b80cff",
  input: "#261d1aff",
  border: "#300d02ff",
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function AddItemScreen({ navigation, addItem }: Props) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Course>("STARTER");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const onSave = () => {
    if (!itemName || !description || !price || !image) {
      Alert.alert("Missing fields", "Please fill in all required fields.");
      return;
    }

    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      Alert.alert("Invalid price", "Enter a valid number.");
      return;
    }

    const intensity: menuItem["intensity"] =
      p < 50 ? "mild" : p < 100 ? "balanced" : "strong";

    const payload: menuItem = {
      id: uid(),
      itemName,
      description,
      category,
      price: p,
      intensity,
      image,
      ingredients: ingredients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    addItem(payload);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.header}>Add New Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor={c.meta}
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            placeholderTextColor={c.meta}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={category}
              onValueChange={(v) => setCategory(v as Course)}
              mode="dropdown"
              dropdownIconColor={c.accent}
              style={styles.picker}
            >
              <Picker.Item label="STARTER" value="STARTER" color={c.text} />
              <Picker.Item label="MAIN" value="MAIN" color={c.text} />
              <Picker.Item label="DESSERT" value="DESSERT" color={c.text} />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor={c.meta}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            placeholderTextColor={c.meta}
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            placeholderTextColor={c.meta}
            value={image}
            onChangeText={setImage}
          />

          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : null}

          <TouchableOpacity style={styles.save} onPress={onSave}>
            <Text style={styles.saveText}>Save Item</Text>
          </TouchableOpacity>

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

const styles = StyleSheet.create({
  form: {
    backgroundColor: c.bg,
    padding: 20,
    flexGrow: 1,
  },
  header: {
    color: c.text,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: c.input,
    color: c.text,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    height: 50,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    color: c.meta,
    marginLeft: 4,
    marginBottom: 6,
    fontWeight: "700",
  },
  pickerBox: {
    backgroundColor: c.input,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.border,
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
    marginBottom: 8,
  },
  picker: {
    color: c.text,
    height: 50,
    width: "100%",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },
  save: {
    backgroundColor: c.accent,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#1b1513",
    fontWeight: "900",
  },
  cancel: {
    alignItems: "center",
    marginTop: 10,
  },
  cancelText: {
    color: c.meta,
    fontWeight: "800",
  },
});

