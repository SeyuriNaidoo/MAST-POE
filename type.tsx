export type Course = "STARTER" | "MAIN" | "DESSERT";

export type menuItem = {
  id: string;
  itemName: string;
  description: string;
  category: Course;
  price: number;
  intensity: "mild" | "balanced" | "strong" | string;
  image: string;
  ingredients: string[];
};

export type RootStackParamlist = {
  Welcome: undefined;
  Home: undefined;
  AddItemScreen: undefined;
  Filter: { items: menuItem[] };
};
