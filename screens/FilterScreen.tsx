import React, { useMemo, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { menuItem, Course, RootStackParamlist } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// Define the props type for the Filter screen, using React Navigation’s Native Stack type system
type Props = NativeStackScreenProps<RootStackParamlist, "Filter">;

// Extend Props to include an optional items array, allowing data to be passed directly to the screen
type ScreenProps = Props & { items?: menuItem[] };

// Define a color palette object for consistent app styling
const c = {
  bg: "#12100f", // background color (dark brown/black tone)
  card: "#1b1513", // card background color
  text: "#f5e9d7", // primary text color (light cream)
  meta: "#cbce00ff", // accent color used for highlights
  input: "#2f0606ff", // input field background (dark red tone)
  border: "#1a0701ff", // border color for input or boxes
};

// Export the main functional component for the Filter screen
export default function FilterScreen({ route, items }: ScreenProps) {
  // Prefer using items passed as a prop; otherwise, use the items from navigation route parameters
  const itemsList: menuItem[] = items ?? route.params?.items ?? [];

  // React state to hold the currently selected course type, default is "STARTER"
  const [selected, setSelected] = useState<Course>("STARTER");

  // useMemo used for efficient filtering — only re-calculates when dependencies change
  const filteredItems = useMemo(
    () => itemsList.filter((i) => i.category === selected), // filters items by category
    [itemsList, selected] // re-run filter when either items or selected value changes
  );

  // JSX returned by the component
  return (
    <SafeAreaView style={styles.container}> {/* Ensures content stays within safe display boundaries */}
      
      {/* DROPDOWN PICKER SECTION */}
      <View style={styles.pickerWrap}> {/* Wrapper for the picker to control spacing */}
        <View style={styles.pickerBox}> {/* Box style for visual framing */}
          <Picker
            selectedValue={selected} // currently selected category value
            onValueChange={(v) => setSelected(v as Course)} // update selected category on user selection
            mode="dropdown" // display style for picker
            dropdownIconColor="#c08a5a" // sets color of dropdown arrow icon
            style={styles.picker} // applies defined picker styling
            itemStyle={{ height: 44 }} // sets height for each dropdown option
          >
            {/* Dropdown menu options for category filtering */}
            <Picker.Item label="STARTER" value="STARTER" color="#f5e9d7" />
            <Picker.Item label="MAIN" value="MAIN" color="#f5e9d7" />
            <Picker.Item label="DESSERT" value="DESSERT" color="#f5e9d7" />
          </Picker>
        </View>
      </View>

      {/* Heading showing which category is selected and how many items match */}
      <Text style={styles.heading}>
        {selected}s ({filteredItems.length})
      </Text>

      {/* List of filtered menu items displayed as cards */}
      <FlatList
        data={filteredItems} // supply the filtered array to FlatList
        keyExtractor={(i) => i.id} // use each item’s ID as the unique key
        contentContainerStyle={{ paddingBottom: 20 }} // adds bottom padding for scroll space
        renderItem={({ item }) => ( // defines how each item will be displayed
          <View style={styles.card}> {/* Card container for each menu item */}
            <Image source={{ uri: item.image }} style={styles.image} /> {/* Displays the food image */}
            <View style={styles.body}> {/* Holds text and ingredient tags */}
              <Text style={styles.title}>{item.itemName}</Text> {/* Displays the item’s name */}

              {/* INGREDIENT TAGS SECTION */}
              <View style={styles.chips}> {/* Container for ingredient chips */}
                {item.ingredients.map((g, idx) => ( // map through all ingredients
                  <View key={idx} style={styles.chip}> {/* Each ingredient chip */}
                    <Text style={styles.chipText}>{g}</Text> {/* Ingredient text */}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Stylesheet for defining all UI element styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg, padding: 16 }, // main container background and padding

  pickerWrap: { marginBottom: 12 }, // spacing below picker

  pickerBox: {
    backgroundColor: c.input, // background for dropdown container
    borderRadius: 12, // rounded corners
    borderWidth: 1, // thin border around picker
    borderColor: c.border, // border color
    overflow: "hidden", // clips overflowing child elements
    height: 50, // height of picker box
    justifyContent: "center", // vertically centers content
  },

  picker: { color: c.text, height: 50, width: "100%" }, // style for Picker component

  heading: {
    color: c.text, // text color
    fontSize: 20, // font size for heading
    fontWeight: "900", // bold text
    textAlign: "center", // center-aligned heading
    marginBottom: 8, // spacing below heading
  },

  card: {
    backgroundColor: c.card, // card background color
    borderRadius: 16, // rounded corners
    overflow: "hidden", // ensures children stay within rounded edges
    marginVertical: 8, // vertical spacing between cards
    elevation: 3, // subtle shadow for Android
  },

  image: { width: "100%", height: 170 }, // image sizing for cards

  body: { padding: 12 }, // padding around card text content

  title: { color: c.text, fontSize: 18, fontWeight: "800" }, // style for item title

  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 }, // layout for ingredient chips

  chip: {
    backgroundColor: c.input, // chip background color
    paddingVertical: 4, // top/bottom padding
    paddingHorizontal: 8, // left/right padding
    borderRadius: 12, // rounded chip corners
  },

  chipText: { color: c.text, fontWeight: "700", fontSize: 12 }, // ingredient text styling
});




//REFERENCING 
//W3Schools. (2025) React Native Tutorial. Available at: https://www.w3schools.com/react/react_native_intro.asp
 //(Accessed: 10 November 2025).

//React Navigation. (2025) React Navigation: Stack Navigator Guide. Available at: https://reactnavigation.org/docs/stack-navigator
 //(Accessed: 10 November 2025).

 //Coolors. (2025) Color Palette Generator. Available at: https://coolors.co
 //(Accessed: 10 November 2025).