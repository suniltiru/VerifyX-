import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { checkEventCode } from '../api/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type EventInputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventInput'>;

type Props = {
    navigation: EventInputScreenNavigationProp;
};

const EventInput: React.FC<Props> = ({ navigation }) => {
    const [code, setCode] = useState('');

    const handleEventCheck = async () => {
        try {
            const response = await checkEventCode(code);
            navigation.navigate('ScannerScreen', { eventId: response.event_id });
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18 }}>Enter Event Code:</Text>
            <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="Event Code"
                style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
            />
            <Button title="Check Code" onPress={handleEventCheck} />
        </View>
    );
};

export default EventInput;
