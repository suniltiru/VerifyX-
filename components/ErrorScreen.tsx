import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ErrorScreenRouteProp = RouteProp<RootStackParamList, 'ErrorScreen'>;

type Props = {
    route: ErrorScreenRouteProp;
};

const ErrorScreen: React.FC<Props> = ({ route }) => {
    const { reason } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Ticket Invalid!</Text>
            <Text style={{ color: 'white', marginTop: 10 }}>{reason}</Text>
        </View>
    );
};

export default ErrorScreen;
