import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Camera, CameraType, PermissionStatus } from 'expo-camera';
import { checkQRCode } from '../api/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';

type ScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScannerScreen'>;
type ScannerScreenRouteProp = RouteProp<RootStackParamList, 'ScannerScreen'>;

type Props = {
    navigation: ScannerScreenNavigationProp;
    route: ScannerScreenRouteProp;
};

const ScannerScreen: React.FC<Props> = ({ navigation, route }) => {
    const [hasPermission, setHasPermission] = useState<PermissionStatus | null>(null);
    const [scanned, setScanned] = useState(false);
    const { eventId } = route.params;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status);
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);

        try {
            const response = await checkQRCode(eventId, data);
            if (response.status === "valid" && response.ticketInfo) {
                navigation.navigate('SuccessScreen', { ticketInfo: response.ticketInfo });
            } else {
                navigation.navigate('ErrorScreen', { reason: response.reason || "Invalid ticket" });
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        }
    };

    if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
    if (hasPermission !== PermissionStatus.GRANTED) return <Text>No access to camera</Text>;

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={CameraType.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            {scanned && (
                <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
            )}
            <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ScannerScreen;
