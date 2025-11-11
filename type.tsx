export type Course= "STARTER" | "MAIN"| "DESSERT";

export type menuItem={
id : string;
itemName: string ;
description : string ;
category: string;
price: number;
intensity:"Mild"|"Balanced"| "Strong" | string;
image: string;
ingredients:string[];
};

export type RootStackParamlist={ 
    WelcomeScreen: undefined;
    HomeScreen: undefined;
    AddItemScreen: undefined;
    Filter: {items: menuItem[]}| undefined;

};