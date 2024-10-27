import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventInput from './components/EventInput';
import ScannerScreen from './components/ScannerScreen';
import SuccessScreen from './components/SuccessScreen';
import ErrorScreen from './components/ErrorScreen';

export type RootStackParamList = {
    EventInput: undefined;
    ScannerScreen: { eventId: string };
    SuccessScreen: { ticketInfo: { name: string; seat: string } };
    ErrorScreen: { reason: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EventInput">
                <Stack.Screen name="EventInput" component={EventInput} options={{ title: 'Enter Event Code' }} />
                <Stack.Screen name="ScannerScreen" component={ScannerScreen} options={{ title: 'Scan QR Code' }} />
                <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Success' }} />
                <Stack.Screen name="ErrorScreen" component={ErrorScreen} options={{ title: 'Error' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
