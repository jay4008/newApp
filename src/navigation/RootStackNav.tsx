import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, ImageBackground, Dimensions, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from "lodash";
import HomeSearchScreen from '../screens/SearchScreen';
import DetailsGiphy from '../screens/DetailsGiphy';
const Stack = createNativeStackNavigator();
const RootStackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="Home"
                    component={HomeSearchScreen}
                    options={{ title: 'Welcome', headerShown: false }}
                />
                <Stack.Screen name="Details" component={DetailsGiphy} options={{ title: 'Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
});


export default RootStackNav;