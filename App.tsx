// Title: Chef Christoffel's Menu App
// Author: Seyuri Naidoo
// Date: 19/10/2025
// Version: 4.5
// Based on the learning materials of the Independent Institute of Education (IIE)

import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { menuItem, Course, RootStackParamlist } from "./type";
import WelcomeScreen from "./screens/WelcomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import FilterScreen from "./screens/FilterScreen";
import HomeScreen from "./screens/HomeScreen";

// Creates a stack navigator object for screen navigation, using the RootStackParamlist type for type safety
const Stack = createNativeStackNavigator<RootStackParamlist>();

// Defines a predefined array of menu items that will be displayed as initial data
const predefined: menuItem[] = [
  {
    id: "1", // Unique identifier for the menu item
    itemName: "Truffle-infused Butternut soup", // Name of the dish
    description:
      "A silky butternut squash velouté infused with black truffle oil, topped with a parmesan crisp and micro herbs.", // Short description
    category: "STARTER", // The course category (Starter, Main, Dessert)
    price: 135, // Price of the item
    intensity: "Balanced", // Describes the flavor intensity
    image:
      "https://i.pinimg.com/736x/75/06/bf/7506bfc83b8d887bb61a01234faf043b.jpg", // Image URL
    ingredients: ["Butternut Squash", "Black Truffle Oil", "Parmesan Cheese", "Greek yogurt"], // List of ingredients
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
    itemName: "peri-peri Chicken Livers",
    description:
      "Spicy and saucy chicken livers cooked in a fiery peri-peri sauce.",
    category: "STARTERS",
    price: 50,
    intensity: "Bold",
    image:
      "https://i.pinimg.com/736x/19/13/f9/1913f99158bd4a732fc9db6cbf68e9e5.jpg",
    ingredients: ["Chicken livers", "peri-peri sauce", "onions", "garlic."],
  },
  {
    id: "5",
    itemName: " Pork Chops",
    description:
      "Juicy, pan-seared pork chops seasoned to perfection.",
    category: "MAIN",
    price: 120,
    intensity: "Bold",
    image:
      "https://images.pexels.com/photos/17772829/pexels-photo-17772829.jpeg?_gl=1*vxm7xj*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDcxOTYkbzQkZzEkdDE3NjI4MDc3MTMkajU5JGwwJGgw",
    ingredients: [ "Pork chops", "olive oil", "salt", "black pepper."],
  },
  {
    id: "6",
    itemName: " Tiramisu",
    description:
      "Classic Italian dessert with layers of coffee-soaked biscuits and creamy mascarpone.",
    category: "DESSERT",
    price: 90,
    intensity: "Mild",
    image:
      "https://images.pexels.com/photos/1707920/pexels-photo-1707920.jpeg?_gl=1*1tjriwn*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDcxOTYkbzQkZzEkdDE3NjI4MDc5MzUkajUzJGwwJGgw",
    ingredients: [ "Mascarpone cheese", "ladyfingers", "coffee", "cocoa powder"],
  },
  {
    id: "7",
    itemName: " Garlic Rolls",
    description:
      "Soft bread roll infused with rich, buttery garlic flavor.",
    category: "STARTER",
    price: 40,
    intensity: "balanced",
    image:
      "https://i.pinimg.com/1200x/d3/25/66/d32566fcee91c7c9ffb7e72ec13a1d23.jpg",
    ingredients: ["Bread roll", "garlic", "butter", "parsley"],
  },
  {
    id: "8",
    itemName: " Chicken Stirfry",
    description:
      "Tender chicken pieces tossed with crisp vegetables in a savory sauce.",
    category: "MAIN",
    price: 100,
    intensity: "Bold",
    image:
      "https://i.pinimg.com/1200x/13/3d/e7/133de7b8eef8d9f2af30891d7112d3d2.jpg",
    ingredients: ["Chicken breast", "soy sauce", "bell peppers", "onions.","rice"],
  },
  {
    id: "9",
    itemName: "Trifle",
    description:
      "A rich layered dessert combining chocolate cake, creamy custard, and fresh strawberries.",
    category: "DESSERT",
    price: 95,
    intensity: "balanced",
    image:
      "https://images.pexels.com/photos/19470003/pexels-photo-19470003.jpeg?_gl=1*j6eug2*_ga*NDQzODA1MDYyLjE3NjA0MjI5NTM.*_ga_8JE65Q40S6*czE3NjI4MDcxOTYkbzQkZzEkdDE3NjI4MDgxNDckajUzJGwwJGgw",
    ingredients: ["Chocolate cake", "strawberries", "chocolate custard, whipped cream."],
  },
];

// Main application function component
export default function App() {
  // State variable holding the list of menu items, initially set to the predefined list
  const [items, setItems] = useState<menuItem[]>(predefined);

  // Function to add a new menu item to the list
  const addItem = (item: menuItem) => setItems((prev) => [...prev, item]);

  // Function to remove an item from the list based on its ID
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  // Function to calculate average price per course category
  const avg = (course: Course) => {
    const list = items.filter((i) => i.category === course); // Filters items by category
    if (!list.length) return "0.00"; // Returns 0 if no items exist in that category
    const total = list.reduce((sum, i) => sum + i.price, 0); // Sums all item prices
    return (total / list.length).toFixed(2); // Returns average price formatted to 2 decimals
  };

  // Return statement defining app navigation structure using React Navigation
  return (
    <NavigationContainer> {/* Wraps navigation in a container required for React Navigation */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1b1513" }, // Dark header background
          headerTintColor: "#e5ff7dd7", // Header text color
          headerTitleStyle: { fontWeight: "800" }, // Bold title font
        }}
      >
        {/* Defines the WelcomeScreen as the initial screen, with header hidden */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        {/* Defines the HomeScreen, passing props and computed averages */}
        <Stack.Screen name="HomeScreen" options={{ title: "Chef Christoffel's Kitchen" }}>
          {(props) => (
            <HomeScreen
              {...props} // Spreads navigation props
              items={items} // Passes menu items to the HomeScreen
              removeItem={removeItem} // Passes the remove function
              averages={{ // Passes calculated averages for each course
                STARTER: avg("STARTER"),
                MAIN: avg("MAIN"),
                DESSERT: avg("DESSERT"),
              }}
            />
          )}
        </Stack.Screen>

        {/* Screen for adding a new menu item */}
        <Stack.Screen name="AddItemScreen" options={{ title: "Add New Item" }}>
          {(props) => <AddItemScreen {...props} addItem={addItem} />} {/* Passes addItem function */}
        </Stack.Screen>

        {/* Screen for filtering the menu */}
        <Stack.Screen name="Filter" options={{ title: "Filter Menu" }}>
          {(props) => <FilterScreen {...props} items={items} />} {/* Passes menu items to filter */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//REFERENCING:
//W3Schools, 2025. [JavaScript Tutorial]. [online] Available at: https://www.w3schools.com
// [Accessed 1 November 2025].

//IIE Varsity College, 2025. [MAST LEARNING UNITS]. [Study material]. Varsity College, South Africa.
// [Accessed 9 November 2025].

//OpenAI. (2025). ChatGPT [online]. [styles colours] Available at: https://chat.openai.com/
// (Accessed: 30 October 2025).

//IMAGES USED:
//PINTEREST. (2025). Pinterest [online]. Available at: https://www.pinterest.com/
// (Accessed: 10 November 2025).

//PEXELS. (2025). Pexels [online]. Available at: https://www.pexels.com/
// (Accessed: 10 November 2025).



