import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from "./screens/HomeScreen";
import RegisterBarbershopScreen from "./screens/RegisterBarbershopScreen";
import BarbershopsScreen from "./screens/BarbershopsScreen";
import BarbershopDetailScreen from "./screens/BarbershopDetailScreen";

const BarbershopStackNavigator = createNativeStackNavigator();

function BarbershopStack() {
    return (
        <BarbershopStackNavigator.Navigator initialRouteName="Barbershops" >
            <BarbershopStackNavigator.Screen
                name="Barbershops"
                component={BarbershopsScreen}
                options={{
                    headerTitle: 'Barberías'
                }} />
            <BarbershopStackNavigator.Screen
                name="BarbershopDetail"
                component={BarbershopDetailScreen}
                options={{
                    headerTitle: 'Información'
                }} />
        </BarbershopStackNavigator.Navigator >
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home">
            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="Barberías"
                component={BarbershopStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="store-marker-outline" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="Registrar barbería"
                component={RegisterBarbershopScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="lead-pencil" size={size} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}