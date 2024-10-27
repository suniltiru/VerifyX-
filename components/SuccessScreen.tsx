import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type SuccessScreenRouteProp = RouteProp<RootStackParamList, 'SuccessScreen'>;

type Props = {
    route: SuccessScreenRouteProp;
};

const SuccessScreen: React.FC<Props> = ({ route }) => {
    const { ticketInfo } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Ticket Valid!</Text>
            <Text style={{ color: 'white', marginTop: 10 }}>{ticketInfo.name} - Seat {ticketInfo.seat}</Text>
        </View>
    );
};

export default SuccessScreen;
