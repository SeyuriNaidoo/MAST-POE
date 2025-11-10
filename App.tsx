// Title: Chef Christoffel's Menu App
// Author: Seyuri Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
//this manages the screen transitions and navigation between components

//import picker for dropdown for category selection
import { Picker } from "@react-native-picker/picker";

import { RootStackParamlist, menuItem } from "./type";
//imports custom items types

// Predefined menu items
const predefinedItems: menuItem[] = [

  {
    id: "1",
    itemName: "Truffle-infused Butternut Velouté",
    description:
      "A silky butternut squash velouté infused with black truffle oil, topped with a parmesan crisp and micro herbs.",
    category: "STARTER",
    price: 135,
    intensity: "Balanced",
    image:
      "https://i.pinimg.com/736x/75/06/bf/7506bfc83b8d887bb61a01234faf043b.jpg",
    ingredients: ["Butternut Squash", "Black Truffle Oil", "Parmesan Cheese", "Greek yogurt"],
  },
  {
    id: "2",
    itemName: "Pan-Seared Lamb Fillet with Red wine",
    description:
      "Tender lamb fillet seared to perfection, served on truffle mash and roasted veggies.",
    category: "MAIN",
    price: 205,
    intensity: "Bold",
    image:
      "https://i.pinimg.com/736x/7d/d5/92/7dd5929d174fb21896489115a6079cef.jpg",
    ingredients: ["lamb fillet", "red wine", "mash potatoes", "baby carrots"],
  },
  {
    id: "3",
    itemName: "Crème Brûlée",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "DESSERT",
    price: 85,
    intensity: "Mild",
    image:
      "https://i.pinimg.com/736x/26/50/94/2650949dbac59547bc807f9483273369.jpg",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
    {
    id: "4",
    itemName: "Caviar",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "STARTER",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/4973825/pexels-photo-4973825.jpeg?_gl=1*1t7dbmt*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDIzMzUkajUzJGwwJGgw",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
 
    {
    id: "5",
    itemName: "Chicken Roast",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "MAIN",
    price: 85,
    intensity: "Balanced",
    image:
      "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?_gl=1*1etidwd*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDI3MzQkajQ0JGwwJGgw",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
    {
    id: "6",
    itemName: "Brownie",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "DESSERT",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?_gl=1*1luz5xc*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDI4MDMkajM1JGwwJGgw",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
    {
    id: "7",
    itemName: "sea weed wrap",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "STARTER",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/10167647/pexels-photo-10167647.jpeg?_gl=1*36ccr*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDI4NzQkajU0JGwwJGgw",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
    {
    id: "8",
    itemName: "Beef lasnage",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "MAIN",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/31119071/pexels-photo-31119071.jpeg?_gl=1*iwgad1*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDI5NjckajQyJGwwJGgw",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
    {
    id: "3",
    itemName: "strawberry and cream",
    description:
      "Silky smooth vanilla custard topped with caramelized sugar, served chilled with fresh berries.",
    category: "DESSERT",
    price: 85,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/7966061/pexels-photo-7966061.jpeg?_gl=1*1c64k78*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDIzMjgkbzMkZzEkdDE3NjI4MDMxNTYkajQkbDAkaDA.",
    ingredients: ["heavy cream", "egg yolks", "vanilla bean", "sugar"],
  },
];

//the menu chosen is for a fine dining expeience making the menu look classy and elegant 

// ======================
// Manage Screen
// ======================
//Screen allows the user to adda new item to the menu
function ManageScreen(
  props: NativeStackScreenProps<RootStackParamlist, "Home">
) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");


//function to handle submit 
  const handleSubmit = () => {
    //checking for empty fields
    if (itemName && description && category && price) { // if statements using for validation 
      const priceValue = parseFloat(price);

      //validation : price must be positive
      if (priceValue > 0) {
        const intensity =
          priceValue < 100
            ? "Mild"
            : priceValue < 200
            ? "Balanced"
            : "Strong";

            //const new menu item object
        const newItem: menuItem = {
          itemName,
          description,
          category,
          price: priceValue,
          intensity,
          image,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        };

        //updates the state in HomeScreen using params passed through navigation
      props.route.params.setItems([...props.route.params.items, newItem]);

        //goes back to homeScreen
                props.navigation.goBack();
      } else {
        Alert.alert("Invalid Price", "Price must be greater than zero.");
      }
    } else {
      Alert.alert(
        "Missing Fields",
        "Please fill out all details before saving. Thank you!" // alert messages for validating if fields are empty , it will prompt a message if space is empty 
      );
    }
  };

  return (
    //render form layput using ScrollView and KeyboardAvoidingView
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a new item to the menu</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={itemName}
            onChangeText={setItemName}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
            
              
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                mode="dropdown"
                dropdownIconColor="#360a0aff"
                style={styles.pickerStyle}
              >
                
                <Picker.Item label="Please select a category" value="" color="#999" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Meal" value="Main Meal" /> 
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker> 
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price (e.g. 100)"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> : null}

          <TextInput
            style={styles.input}
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChangeText={setIngredients}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// ======================
// Home Screen
// ======================
//displays list of menu items and navigates to ManageScreen
function HomeScreen(
  props: NativeStackScreenProps<RootStackParamlist, "Home">
) {
  const [items, setItems] = useState<menuItem[]>(predefinedItems);

  const removeItem = (index: number) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setItems(items.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Christoffel's</Text>
      <Text style={styles.subTitle}>Fine Dining Experience</Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image || "" }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.itemName}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardMeta}>
                {item.category}. R{item.price} ({item.intensity})
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("Home", { items,setItems })}
      >
        <Text style={styles.addText}>+ Add New Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ======================
// Welcome Screen
// ======================
//Landing screen with an image of fine dining restaurant and a button to go to the menu list
function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
    
        <Image
        //fine dining image for welcome screen background
          source={{
            uri: "https://images.pexels.com/photos/3534750/pexels-photo-3534750.jpeg?_gl=1*1kc2l8x*_ga*MTQzMTgzMDEyMC4xNzYwNDIzNDk2*_ga_8JE65Q40S6*czE3NjEwMzAzMDckbzIkZzEkdDE3NjEwMzAzMTAkajU3JGwwJGgw",
          }}
          style={styles.heroImage}
        />
      
      <View style={styles.overlay}>
        <Text style={styles.welcomeTitle}>Welcome to Chef Christoffel's Kitchen!</Text>
        <Text style={styles.welcomeText}>Your fine dining experience, right at your fingertips.</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.startText}> Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ======================
// Main App
// ======================
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamlist>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={ManageScreen}
          options={{
            title: "Add Menu Item",
            headerStyle: { backgroundColor: "#670d0dff" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ======================
// Styles
// ======================
// Sets up navigation stack between screens 

//colours chosen for the app is red ,gold and black for elegant themes. Making the user feel like they are fine dining.
const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: "#2E2E2E" },

  heroImage: { width: "100%", height: "111%", position:"absolute" },
  overlay: {
    flex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: { color: "#D4AF37", 
    fontSize: 34, 
    fontWeight: "700", 
    textAlign: "center", 
    marginBottom: 10 },

  welcomeText: { color: "#FAF8F1",
     fontSize: 16, 
     textAlign: "center", 
     marginBottom: 30 },

  startButton: { backgroundColor: "#D4AF37",
     paddingVertical: 14, 
     paddingHorizontal: 40, 
     borderRadius: 30 },

  startText: { color: "#2E2E2E",
     fontWeight: "bold",
      fontSize: 18 },

  container: { flex: 1,
     backgroundColor: "#FAF8F1", 
     padding: 15 },

  mainTitle: { fontSize: 28,
     fontWeight: "800",
      color: "#800020", 
     textAlign: "center" },

  subTitle: { textAlign: "center",
     color: "#2E2E2E", 
     marginBottom:
      15, fontSize: 15 },

  card: { backgroundColor: "#FFFFFF",
     borderRadius: 18,
      marginVertical: 10,
      overflow: "hidden", 
      shadowColor: "#000",
       shadowOpacity: 0.15, 
       shadowRadius: 5, 
       elevation: 5 },

  cardImage: { width: "100%",
     height: 220 },

  cardContent: { padding: 15 },

  cardTitle: { fontSize: 20,
     fontWeight: "700", 
     color: "#2E2E2E" },

  cardDesc: { color: "#800020" },

  cardMeta: { color: "#D4AF37",
     fontWeight: "600" },

  removeButton: { backgroundColor: "#800020",
     padding: 10,
      borderRadius: 8,
      alignItems: "center",
       marginTop: 10 },

  removeText: { color: "#FAF8F1",
     fontWeight: "bold" },

  addButton: { backgroundColor: "#D4AF37", 
    borderRadius: 30, 
    paddingVertical: 16, 
    alignItems: "center", 
    marginTop: 10,
    elevation: 4 },

  addText: { color: "#2E2E2E",
     fontSize: 18,
      fontWeight: "bold" },

  formContainer: { backgroundColor: "#F5E6CA", 
    padding: 20 },

  formHeader: { fontSize: 24,
     color: "#800020", 
     fontWeight: "bold",
     textAlign: "center", 
     marginBottom: 30 },

  input: { backgroundColor: "#FFFFFF",
     borderRadius: 10, borderColor: "#D4AF37",
      borderWidth: 1,
       paddingHorizontal: 12,
       height: 50,
        justifyContent: "center",
        marginVertical: 8 },

  pickerWrapper: { marginVertical: 10 },

  label: { fontSize: 15,
     fontWeight: "600",
      color: "#2E2E2E",
       marginBottom: 6,
        marginLeft: 10 },

  pickerContainer: { borderWidth: 1,
     borderColor: "#D4AF37",
      borderRadius: 10, 
      backgroundColor: "#FFFFFF", 
      justifyContent: "center" },

  pickerStyle: { height: 50, 
    width: "100%",
     color: "#2E2E2E",
      fontSize: 15, 
      paddingHorizontal: 10 },

  imagePreview: { width: "100%",
     height: 220,
      borderRadius: 15,
      marginTop: 15, shadowColor: "#000", 
      shadowOpacity: 0.2, shadowRadius: 5 },

  saveButton: { backgroundColor: "#800020",
     padding: 15, 
     borderRadius: 10,
      marginTop: 15, 
      alignItems: "center" },

  saveButtonText: { color: "#FAF8F1",
     fontWeight: "bold",
      fontSize: 16 },

  cancelButton: { alignItems: "center",
     marginTop: 10 },

  cancelButtonText: { color: "#2E2E2E",
     fontWeight: "bold" },
});

//REFERENCING:
//W3Schools, 2025. [JavaScript Tutorial]. [online] Available at: https://www.w3schools.com
// [Accessed 21 October 2025].

//IIE Varsity College, 2025. [MAST LEARNING UNITS]. [Study material]. Varsity College, South Africa.
// [Accessed 19 October 2025].

//OpenAI. (2025). ChatGPT [online]. [styles colours] Available at: https://chat.openai.com/
// (Accessed: 21 October 2025).

//IMAGES USED:
//PINTEREST. (2025). Pinterest [online]. Available at: https://www.pinterest.com/
// (Accessed: 21 October 2025).

//PEXELS. (2025). Pexels [online]. Available at: https://www.pexels.com/
// (Accessed: 21 October 2025).

