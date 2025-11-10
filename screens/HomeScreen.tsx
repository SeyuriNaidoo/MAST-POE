import React from "react";
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { menuItem, RootStackParamlist } from "../type";

type Props = NativeStackScreenProps<RootStackParamlist, "Home"> & {
  items: menuItem[];
  removeItem: (id: string) => void;
  averages: { STARTER: string; MAIN: string; DESSERT: string };
};

export default function HomeScreen({ navigation, items, removeItem, averages }: Props) {
  const confirmRemove = (id: string) => {
    Alert.alert("Remove item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Our Menu ({items.length})</Text>

      <View style={styles.statsRow}>
        {["STARTER","MAIN","DESSERT"].map((cat) => (
          <View key={cat} style={styles.stat}>
            <Text style={styles.statLabel}>{cat}s</Text>
            <Text style={styles.statValue}>R{averages[cat as keyof typeof averages]}</Text>
            <Text style={styles.statCount}>
              {items.filter(i => i.category === cat).length} items
            </Text>
          </View>
        ))}
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <Text style={styles.title}>{item.itemName}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.meta}>
                {item.category} · R{item.price} · {item.intensity}
              </Text>
              <TouchableOpacity style={styles.remove} onPress={() => confirmRemove(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.fabs}>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddItemScreen")}>
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.fab, styles.fabAlt]} onPress={() => navigation.navigate("Filter")}>
          <Text style={styles.fabText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const c = { bg:"#12100f", card:"#1b1513", text:"#f5e9d7", meta:"#b69b7f", accent:"#c08a5a", chip:"#2b221f" };
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:c.bg, padding:16 },
  heading: { color:c.text, fontSize:26, fontWeight:"900", textAlign:"center", marginBottom:12 },
  statsRow: { flexDirection:"row", justifyContent:"space-between", marginBottom:12 },
  stat: { backgroundColor:c.card, width:"32%", borderRadius:14, paddingVertical:10, alignItems:"center", elevation:3 },
  statLabel: { color:c.meta, fontSize:12 },
  statValue: { color:c.text, fontSize:16, fontWeight:"800" },
  statCount: { color:c.meta, fontSize:11, marginTop:4 },
  card: { backgroundColor:c.card, borderRadius:16, overflow:"hidden", marginVertical:8, elevation:4 },
  image: { width:"100%", height:200 },
  body: { padding:12 },
  title: { color:c.text, fontSize:18, fontWeight:"800" },
  desc: { color:c.meta, marginVertical:6 },
  meta: { color:c.text, fontSize:12, opacity:0.7 },
  remove: { backgroundColor:c.chip, paddingVertical:10, borderRadius:10, alignItems:"center", marginTop:10 },
  removeText: { color:c.text, fontWeight:"800" },
  fabs: { position:"absolute", right:20, bottom:20, flexDirection:"row", gap:12 },
  fab: { backgroundColor:c.accent, paddingVertical:14, paddingHorizontal:22, borderRadius:30, elevation:6 },
  fabAlt: { backgroundColor:"#946a46" },
  fabText: { color:c.bg, fontWeight:"900" },
});
